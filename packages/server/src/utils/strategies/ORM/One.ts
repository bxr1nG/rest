import type Data from "~/types/Data";
import type QuerySource from "~/types/ORM/QuerySource";
import type QueryCriteria from "~/types/ORM/QueryCriteria";
import type Include from "~/types/ORM/Include";
import Base from "~/utils/strategies/ORM/Base";

import newQueryTime from "./decorators/newQueryTime";
import measureSelectTime from "./decorators/measureSelectTime";
import printSqlQuery from "./decorators/printSqlQuery";

class One extends Base {
    @newQueryTime()
    @measureSelectTime()
    public static override async select<T extends Data & Record<string, Data>>(
        source: QuerySource,
        criteria?: QueryCriteria,
        isBasis?: boolean
    ): Promise<T[]> {
        const values: Array<string> = [];
        const sql = this.buildSql(values, source, criteria, isBasis);

        let result = (await this.execute<T[]>({ sql, values }))[0];

        if (criteria && criteria.include) {
            result = await this.addInclude<T>(result, criteria.include);
        }

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
            criteria ? this.parseCriteria(criteria, values) : ""
        }`;
    }

    private static async addInclude<T extends Data & Record<string, Data>>(
        result: Array<T>,
        includes: Array<Include>
    ): Promise<Array<T>> {
        for (const include of includes) {
            const sources = result.map(
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                (row) => row[include.sourceColumn] as T[keyof T]
            );

            const subbuilder = this.for(include.targetTable).where(
                sources.map((source) => [include.targetColumn, "equal", source])
            );

            if (include.params) {
                this.connectParams(subbuilder, include.params);
            }

            const subquery = subbuilder.build();
            const subresult = await this.select(
                subquery.source,
                subquery.criteria
            );

            result = result.map((row) => ({
                ...row,
                [include.alias || include.targetTable]: subresult.find(
                    (subrow) =>
                        subrow[include.targetColumn] ===
                        row[include.sourceColumn]
                )
            }));
        }

        return result;
    }
}

export default One;
