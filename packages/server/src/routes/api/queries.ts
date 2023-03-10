import type ParsedParams from "~/types/ParsedParams";

const queries = {
    getAll: (table: string, params: ParsedParams) => `
        SELECT * FROM ${table}
            ORDER BY ${params.sort} ${params.order}
            LIMIT ${params.limit}
            OFFSET ${params.page * params.limit}`,
    getAllCount: (table: string) => `
        SELECT COUNT(*) FROM ${table}`,
    getById: (table: string, id: number) =>
        `SELECT * FROM ${table} WHERE id = ${id}`
};

export default queries;
