import type Data from "~/types/Data";
import type ParsedParams from "~/types/ParsedParams";
import type Count from "~/types/Count";
import type CountRows from "~/types/CountRows";
import db from "~/db";

import queries from "./queries";

const services = {
    getAll: async (table: string, params: ParsedParams) => {
        return {
            data: (await db.execute<Data[]>(queries.getAll(table, params)))[0],
            count: (
                (
                    await db.execute<Count[]>(queries.getAllCount(table))
                )[0][0] as CountRows
            )["COUNT(*)"]
        };
    },
    getById: async (table: string, id: number) => {
        return (await db.execute<Data[]>(queries.getById(table, id)))[0];
    }
};

export default services;
