import type Data from "~/types/Data";
import type QuerySource from "~/types/ORM/QuerySource";
import type QueryCriteria from "~/types/ORM/QueryCriteria";
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
            result = await this.addBaseInclude<T>(result, criteria.include);
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
}

export default Every;
