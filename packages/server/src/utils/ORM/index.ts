import type Data from "~/types/Data";
import type QuerySource from "~/types/ORM/QuerySource";
import type QueryCriteria from "~/types/ORM/QueryCriteria";
import type Count from "~/types/Count";
import type Rows from "~/types/Rows";
import type CountRows from "~/types/CountRows";
import type Include from "~/types/ORM/Include";
import type ParsedParams from "~/types/ParsedParams";
import db from "~/db";

import Query from "./Query";

class ORM {
    static for<T extends Rows>(table: string) {
        const query = new Query<T>(table);
        return query;
    }

    static async select<T extends Data & Record<string, Data>>(
        source: QuerySource,
        criteria?: QueryCriteria
    ) {
        let query = `SELECT * FROM ${source.table}`;
        if (criteria) {
            query = `${query} ${this.parseCriteria(criteria)}`;
        }
        let result = (await db.execute<T[]>(query))[0];

        if (criteria && criteria.include) {
            result = await this.addInclude<T>(result, criteria.include);
        }

        if (criteria && criteria.includeMany) {
            result = await this.addInclude<T>(
                result,
                criteria.includeMany,
                true
            );
        }

        return result;
    }

    static async selectCount(source: QuerySource, criteria?: QueryCriteria) {
        let query = `SELECT COUNT(*) FROM ${source.table}`;
        if (criteria) {
            query = `${query} ${this.parseCriteria(criteria)}`;
        }
        const result = ((await db.execute<Count[]>(query))[0][0] as CountRows)[
            "COUNT(*)"
        ];
        return result;
    }

    static connectParams(builder: Query<Rows>, params: ParsedParams) {
        if (params.filter) {
            params.filter.forEach(([expression, values]) =>
                builder.where(expression, values)
            );
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

    private static parseCriteria(criteria: QueryCriteria): string {
        let query = "";
        if (criteria.where.length) {
            const conditions = criteria.where
                .map(([expression, values]) => {
                    values.map((value) => {
                        expression = expression.replace("?", value.toString());
                    });
                    return expression;
                })
                .join(" AND ");
            query = `${query} WHERE ${conditions}`;
        }
        if (criteria.order.length) {
            const orders = criteria.order
                .map(([column, order]) => `${column} ${order}`)
                .join(", ");
            query = `${query} ORDER BY ${orders}`;
        }
        if (criteria.range) {
            const [limit, offset] = criteria.range;
            query = `${query} LIMIT ${limit} OFFSET ${offset}`;
        }
        return query;
    }

    private static async addInclude<T extends Data & Record<string, Data>>(
        result: Array<T>,
        includes: Array<Include>,
        isMany?: boolean
    ): Promise<Array<T>> {
        const resultWithInclude: Array<T> = [];

        for (let row of result) {
            for (const include of includes) {
                const subbuilder = ORM.for(include.targetTable).where("? = ?", [
                    include.targetColumn,
                    row[include.sourceColumn] as T[keyof T]
                ]);

                if (include.params) {
                    ORM.connectParams(subbuilder, include.params);
                }

                const subquery = subbuilder.build();
                const subresult = await ORM.select(
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

export default ORM;
