import type ParsedParams from "~/types/ParsedParams";
import ORM from "~/utils/ORM";

const queries = {
    getAll: async (table: string, params: ParsedParams) => {
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
        if (params.range) {
            const [limit, offset] = params.range;
            builder.range(limit, offset);
        }
        if (params.include) {
            params.include.forEach((include) => builder.include(include));
        }

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
    getById: async (table: string, id: string) => {
        const query = ORM.for(table).where("id = ?", [id]).build();
        return await ORM.select(query.source, query.criteria);
    }
};

export default queries;
