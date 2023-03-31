import type { QueryOptions, RowDataPacket } from "mysql2";

import type Data from "~/types/Data";
import type QuerySource from "~/types/ORM/QuerySource";
import type QueryCriteria from "~/types/ORM/QueryCriteria";
import type Count from "~/types/Count";
import type Rows from "~/types/Rows";
import type CountRows from "~/types/CountRows";
import type ParsedParams from "~/types/ParsedParams";
import type Include from "~/types/ORM/Include";
import type IncludeMany from "~/types/ORM/IncludeMany";
import Query from "~/utils/Query";
import db from "~/db";
import config from "~/config";

class Base {
    public static select<T extends Data & Record<string, Data>>(
        _source: QuerySource,
        _criteria?: QueryCriteria | undefined,
        _isBasis?: boolean | undefined
    ): Promise<T[]> {
        throw new Error("Method not implemented.");
    }

    public static connectParams(
        builder: Query<Rows>,
        params: ParsedParams
    ): void {
        if (params.filter) {
            params.filter.forEach((expressions) => builder.where(expressions));
        }
        if (params.sort) {
            params.sort.forEach(([column, order]) =>
                builder.order(column, order)
            );
        }
        if (params.range) {
            const [limit, offset] = params.range;
            builder.range(limit, offset);
        }
        if (params.include) {
            params.include.forEach((include) => builder.include(include));
        }
        if (params.includeMany) {
            params.includeMany.forEach((include) =>
                builder.includeMany(include)
            );
        }
    }

    public static for<T extends Rows>(table: string) {
        const query = new Query<T>(table);
        return query;
    }

    public static async selectCount(
        source: QuerySource,
        criteria?: QueryCriteria
    ) {
        const values: Array<string> = [];
        let query = `SELECT COUNT(*) FROM ${source.table}`;
        if (criteria) {
            query = `${query} ${this.parseCriteria(criteria, values)}`;
        }
        const result = (
            (
                await this.execute<Count[]>({ sql: query, values })
            )[0][0] as CountRows
        )["COUNT(*)"];
        return result;
    }

    public static async getTableColumns(table: string): Promise<Array<string>> {
        const result = await this.execute<
            [{ COLUMN_NAME: string }] & RowDataPacket[]
        >({
            sql: "select COLUMN_NAME from information_schema.columns where table_schema = ? and table_name = ? order by ORDINAL_POSITION",
            values: [config.mySql.database, table]
        });
        return result[0].map((res) => res["COLUMN_NAME"]);
    }

    public static async getTables(): Promise<Array<string>> {
        const result = await this.execute<
            [{ TABLE_NAME: string }] & RowDataPacket[]
        >({
            sql: "select TABLE_NAME from information_schema.tables where table_schema = ?",
            values: [config.mySql.database]
        });
        return result[0].map((res) => res["TABLE_NAME"]);
    }

    protected static async execute<T extends RowDataPacket[]>(
        query: QueryOptions
    ) {
        return db.execute<T>(query);
    }

    protected static parseCriteria(
        criteria: QueryCriteria,
        values: Array<string>
    ): string {
        let query = "";
        if (criteria.where.length) {
            const conditions = criteria.where
                .map(
                    (expressions) =>
                        `(${expressions
                            .map(([field, type, value]) => {
                                values.push(value);
                                if (type === "like") {
                                    return `${field} LIKE CONCAT('%', ?, '%'`;
                                } else if (type === "equal") {
                                    return `${field} = ?`;
                                } else if (type === "more") {
                                    return `${field} > ?`;
                                } else if (type === "less") {
                                    return `${field} < ?`;
                                } else {
                                    throw new Error(
                                        "Incorrect where condition"
                                    );
                                }
                            })
                            .join("\n\t   OR ")})`
                )
                .join("\n\t  AND ");
            query = `${query}\n\tWHERE ${conditions}`;
        }
        if (criteria.order.length) {
            const orders = criteria.order
                .map(([column, order]) => `${column} ${order}`)
                .join(",\n\t\t ");
            query = `${query}\n\tORDER BY ${orders}`;
        }
        if (criteria.range) {
            const [limit, offset] = criteria.range;
            query = `${query}\n\tLIMIT ${limit} OFFSET ${offset}`;
        }
        return query;
    }

    protected static async addBaseInclude<
        T extends Data & Record<string, Data>
    >(
        result: Array<T>,
        includes: Array<Include> | Array<IncludeMany>,
        isMany?: boolean
    ): Promise<Array<T>> {
        const resultWithInclude: Array<T> = [];

        for (let row of result) {
            for (const include of includes) {
                const subbuilder = this.for(include.targetTable).where([
                    [
                        include.targetColumn,
                        "equal",
                        row[include.sourceColumn] as T[keyof T]
                    ]
                ]);

                if (include.params) {
                    this.connectParams(subbuilder, include.params);
                }

                const subquery = subbuilder.build();
                const subresult = await this.select(
                    subquery.source,
                    subquery.criteria
                );

                row = {
                    ...row,
                    [include.alias || include.targetTable]: isMany
                        ? subresult
                        : subresult[0]
                };
            }

            resultWithInclude.push(row);
        }

        return resultWithInclude;
    }
}

export default Base;
