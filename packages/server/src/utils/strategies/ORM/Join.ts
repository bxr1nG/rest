import type { RowDataPacket } from "mysql2";

import type Data from "~/types/Data";
import type QuerySource from "~/types/ORM/QuerySource";
import type QueryCriteria from "~/types/ORM/QueryCriteria";
import type Include from "~/types/ORM/Include";
import Base from "~/utils/strategies/ORM/Base";

import newQueryTime from "./decorators/newQueryTime";
import measureSelectTime from "./decorators/measureSelectTime";
import printSqlQuery from "./decorators/printSqlQuery";

class Join extends Base {
    @newQueryTime()
    @measureSelectTime()
    public static override async select<T extends Data & Record<string, Data>>(
        source: QuerySource,
        criteria?: QueryCriteria,
        isBasis?: boolean
    ): Promise<T[]> {
        const values: Array<string> = [];
        const sql = this.buildSql(values, source, criteria, isBasis);

        const array = (
            await this.execute<Array<Array<string> & RowDataPacket>>({
                sql,
                values,
                rowsAsArray: true
            })
        )[0];
        let result = await this.mapResultArray<T>(
            source.table,
            criteria?.include || [],
            array
        );

        if (criteria && criteria.includeMany) {
            result = await this.addBaseInclude<T>(
                result,
                criteria.includeMany,
                true
            );
        }

        return result;
    }

    @printSqlQuery()
    private static buildSql(
        values: Array<string>,
        source: QuerySource,
        criteria?: QueryCriteria,
        _isBasis?: boolean
    ) {
        return `SELECT * FROM ${source.table}${
            criteria?.include
                ? this.addJoins(source.table, criteria.include)
                : ""
        }${criteria ? this.parseCriteria(criteria, values) : ""}`;
    }

    private static addJoins(table: string, includes: Array<Include>) {
        return includes
            .map(
                (include) =>
                    `\n\tLEFT JOIN ${include.targetTable}\n\t  ON ${table}.${include.sourceColumn} = ${include.targetTable}.${include.targetColumn}`
            )
            .join("");
    }

    private static async mapResultArray<T extends Data & Record<string, Data>>(
        table: string,
        includes: Array<Include>,
        result: Array<Array<string>>
    ): Promise<Array<T>> {
        const resultWithInclude: Array<T> = [];
        const fields = await this.getTableColumns(table);

        for (const arr of result) {
            let row = this.arrayToObject<T>(
                fields,
                arr.splice(0, fields.length)
            );

            for (const include of includes) {
                const subfields = await this.getTableColumns(
                    include.targetTable
                );

                row = {
                    ...row,
                    [include.alias || include.targetTable]:
                        this.arrayToObject<T>(
                            subfields,
                            arr.splice(0, subfields.length)
                        )
                };
            }

            resultWithInclude.push(row);
        }

        return resultWithInclude;
    }

    private static arrayToObject<T extends Data & Record<string, Data>>(
        keys: Array<string>,
        values: Array<string>
    ): T {
        return Object.fromEntries(
            keys.map((key, index) => [key, values[index] as string])
        ) as T;
    }
}

export default Join;
