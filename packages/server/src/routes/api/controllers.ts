import type Params from "~/types/Params";
import NotFoundError from "~/utils/errors/NotFoundError";
import parseParams from "~/utils/parseParams";

import services from "./services";

const controllers = {
    getAll: async (table: string, query: Params) => {
        const params = parseParams(query);
        return services.getAll(table, params);
    },
    getById: async (table: string, id: string, idColumn: string) => {
        const player = await services.getById(table, id, idColumn);
        if (player.length !== 1) {
            throw new NotFoundError();
        }
        return player[0];
    }
};

export default controllers;
