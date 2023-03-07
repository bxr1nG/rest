import type PlayerGetAllParams from "~/types/PlayerGetAllParams";
import NotFoundError from "~/utils/errors/NotFoundError";
import parsePlayerGetAllParams from "~/utils/parsePlayerGetAllParams";

import services from "./services";

const controllers = {
    getAll: async (query: PlayerGetAllParams) => {
        const params = parsePlayerGetAllParams(query);
        return services.getAll(params);
    },
    getById: async (id: number) => {
        const player = await services.getById(id);
        if (player.length !== 1) {
            throw new NotFoundError();
        }
        return player[0];
    }
};

export default controllers;
