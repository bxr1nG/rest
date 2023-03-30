import type Data from "~/types/Data";
import type QuerySource from "~/types/ORM/QuerySource";
import type QueryCriteria from "~/types/ORM/QueryCriteria";
import type Include from "~/types/ORM/Include";
import type IncludeMany from "~/types/ORM/IncludeMany";
import type Rows from "~/types/Rows";
import type ParsedParams from "~/types/ParsedParams";
import type Query from "~/utils/Query";
import Base from "~/utils/strategies/ORM/Base";

import newQueryTime from "./decorators/newQueryTime";
import measureSelectTime from "./decorators/measureSelectTime";
import printSqlQuery from "./decorators/printSqlQuery";

class Every extends Base {
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
            result = await this.addInclude<T>(
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

    public static override connectParams(
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

    private static async addInclude<T extends Data & Record<string, Data>>(
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

export default Every;
