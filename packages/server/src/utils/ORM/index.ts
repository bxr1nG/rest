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

    static async select<T extends Data>(
        source: QuerySource,
        criteria?: QueryCriteria
    ) {
        let query = `SELECT * FROM ${source.table}`;
        if (criteria) {
            query = `${query} ${this.parseCriteria(criteria)}`;
        }
        const result = await db.execute<T[]>(query);
        return result[0];
    }

    static async selectCount(source: QuerySource, criteria?: QueryCriteria) {
        let query = `SELECT COUNT(*) FROM ${source.table}`;
        if (criteria) {
            query = `${query} ${this.parseCriteria(criteria)}`;
        }
        const result = await db.execute<Count[]>(query);
        return (result[0][0] as CountRows)["COUNT(*)"];
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
