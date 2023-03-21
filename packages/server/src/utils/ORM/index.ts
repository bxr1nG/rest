import type Data from "~/types/Data";
import type QuerySource from "~/types/ORM/QuerySource";
import type QueryCriteria from "~/types/ORM/QueryCriteria";
import type Count from "~/types/Count";
import type Rows from "~/types/Rows";
import type CountRows from "~/types/CountRows";
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
            result = result.map((row) => {
                criteria.include.map(async (include) => {
                    const subquery = ORM.for(include.targetTable)
                        .where("? = ?", [
                            include.targetColumn,
                            row[include.sourceColumn] as T[keyof T]
                        ])
                        .build();
                    const subresult = await ORM.select(
                        subquery.source,
                        subquery.criteria
                    );
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    row[include.alias] = subresult[0];
                });
                return row;
            });
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
}

export default ORM;
