import type ParsedParams from "~/types/ParsedParams";

const queries = {
    getAll: (table: string, params: ParsedParams) => `
        SELECT * FROM ${table}
            WHERE ${params.fields
                .map((field) => `${field} LIKE '%${params.search}%'`)
                .join(" OR ")}
            ORDER BY ${params.sort} ${params.order}
            LIMIT ${params.limit}
            OFFSET ${params.page * params.limit}`,
    getAllCount: (table: string, params: ParsedParams) => `
        SELECT COUNT(*) FROM ${table}
            WHERE ${params.fields
                .map((field) => `${field} LIKE '%${params.search}%'`)
                .join(" OR ")}`,
    getById: (table: string, id: number) =>
        `SELECT * FROM ${table} WHERE id = ${id}`
};

export default queries;
