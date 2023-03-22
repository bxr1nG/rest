import type ParsedParams from "~/types/ParsedParams";
import ORM from "~/utils/ORM";

const queries = {
    getAll: async (table: string, params: ParsedParams) => {
        const builder = ORM.for(table);
        ORM.connectParams(builder, params);
        const query = builder.build();
        return await ORM.select(query.source, query.criteria);
    },
    getAllCount: async (table: string, params: ParsedParams) => {
        const builder = ORM.for(table);
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

        const query = builder.build();
        return await ORM.selectCount(query.source, query.criteria);
    },
    getById: async (table: string, id: string, idColumn: string) => {
        const query = ORM.for(table)
            .where("? = ?", [idColumn, `"${id}"`])
            .build();
        return await ORM.select(query.source, query.criteria);
    }
};

export default queries;
