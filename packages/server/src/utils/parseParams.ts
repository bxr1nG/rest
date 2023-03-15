import type Params from "~/types/Params";
import type ParsedParams from "~/types/ParsedParams";

const parseParams = (query: Params): ParsedParams => ({
    page: +(query.page || 0),
    limit: +(query.limit || 10),
    sort: query.sort ?? "id",
    order: (query.order && ["ASC", "DESC"].includes(query.order)
        ? query.order
        : "ASC ") as "ASC" | "DESC",
    search: query.search || "",
    fields: ["id"]
});

export default parseParams;
