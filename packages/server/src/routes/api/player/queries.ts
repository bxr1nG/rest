import type PlayerGetAllParsedParams from "~/types/PlayerGetAllParsedParams";

const queries = {
    getAll: (params: PlayerGetAllParsedParams) => `
        SELECT * FROM player
            WHERE
                first_name LIKE '%${params.search}%' OR
                last_name LIKE '%${params.search}%' OR
                middle_name LIKE '%${params.search}%'
            ORDER BY ${params.sort} ${params.order}
            LIMIT ${params.limit}
            OFFSET ${params.page * params.limit}`,
    getAllCount: (search: string) => `
        SELECT COUNT(*) FROM player
        WHERE
            first_name LIKE '%${search}%' OR
            last_name LIKE '%${search}%' OR
            middle_name LIKE '%${search}%'`,
    getById: (id: number) => `SELECT * FROM player WHERE id = ${id}`
};

export default queries;
