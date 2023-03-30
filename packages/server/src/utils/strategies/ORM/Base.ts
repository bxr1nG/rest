import type { RowDataPacket } from "mysql2";

import type Data from "~/types/Data";
import type QuerySource from "~/types/ORM/QuerySource";
import type QueryCriteria from "~/types/ORM/QueryCriteria";
import type Count from "~/types/Count";
import type Rows from "~/types/Rows";
import type CountRows from "~/types/CountRows";
import type ParsedParams from "~/types/ParsedParams";
import db from "~/db";
import Query from "~/utils/Query";

class Base {
    public static select<T extends Data & Record<string, Data>>(
        _source: QuerySource,
        _criteria?: QueryCriteria | undefined,
        _isBasis?: boolean | undefined
    ): Promise<T[]> {
        throw new Error("Method not implemented.");
    }

    public static connectParams(
        _builder: Query<Rows>,
        _params: ParsedParams
    ): void {
        throw new Error("Method not implemented.");
    }

    public static for<T extends Rows>(table: string) {
        const query = new Query<T>(table);
        return query;
    }

    public static async selectCount(
        source: QuerySource,
        criteria?: QueryCriteria
    ) {
        let query = `SELECT COUNT(*) FROM ${source.table}`;
        if (criteria) {
            query = `${query} ${this.parseCriteria(criteria)}`;
        }
        const result = (
            (await this.execute<Count[]>(query))[0][0] as CountRows
        )["COUNT(*)"];
        return result;
    }

    protected static async execute<T extends RowDataPacket[]>(query: string) {
        return db.execute<T>(query);
    }

    protected static parseCriteria(criteria: QueryCriteria): string {
        let query = "";
        if (criteria.where.length) {
            const conditions = criteria.where
                .map(([expression, values]) => {
                    values.map((value) => {
                        expression = expression.replace("?", value.toString());
                    });
                    return expression;
                })
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
}

export default Base;
