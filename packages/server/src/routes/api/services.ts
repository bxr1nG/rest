import type ParsedParams from "~/types/ParsedParams";

import queries from "./queries";

const services = {
    getAll: async (table: string, params: ParsedParams) => {
        return {
            data: await queries.getAll(table, params),
            count: await queries.getAllCount(table, params)
        };
    },
    getById: async (table: string, id: string, idColumn: string) => {
        return await queries.getById(table, id, idColumn);
    }
};

export default services;
