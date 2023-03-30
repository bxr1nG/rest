import type ParsedParams from "~/types/ParsedParams";
import ORM from "~/utils/strategies/ORM";

const queries = {
    getAll: async (table: string, params: ParsedParams) => {
        const builder = ORM.for(table);
        ORM.connectParams(builder, params);
        const query = builder.build();
        return await ORM.select(query.source, query.criteria, true);
    },
    getAllCount: async (table: string, params: ParsedParams) => {
        const builder = ORM.for(table);
        if (params.filter) {
            params.filter.forEach((expressions) => builder.where(expressions));
        }
        if (params.sort) {
            params.sort.forEach(([column, order]) =>
                builder.order(column, order)
            );
        }

        const query = builder.build();
        return await ORM.selectCount(query.source, query.criteria);
    },
    getById: async (table: string, id: string, idColumn: string) => {
        const query = ORM.for(table)
            .where([[idColumn, "equal", id]])
            .build();
        return await ORM.select(query.source, query.criteria);
    }
};

export default queries;
