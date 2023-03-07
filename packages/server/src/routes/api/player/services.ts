import type Player from "~/types/Player";
import type PlayerGetAllParsedParams from "~/types/PlayerGetAllParsedParams";
import type Count from "~/types/Count";
import type CountRows from "~/types/CountRows";
import db from "~/db";

import queries from "./queries";

const services = {
    getAll: async (params: PlayerGetAllParsedParams) => {
        return {
            data: (await db.execute<Player[]>(queries.getAll(params)))[0],
            count: (
                (
                    await db.execute<Count[]>(
                        queries.getAllCount(params.search)
                    )
                )[0][0] as CountRows
            )["COUNT(*)"]
        };
    },
    getById: async (id: number) => {
        return (await db.execute<Player[]>(queries.getById(id)))[0];
    }
};

export default services;
