import type PlayerGetAllParams from "~/types/PlayerGetAllParams";
import type PlayerGetAllParsedParams from "~/types/PlayerGetAllParsedParams";
import type PlayerRows from "~/types/PlayerRows";

const parsePlayerGetAllParams = (
    query: PlayerGetAllParams
): PlayerGetAllParsedParams => ({
    page: +(query.page || 0),
    limit: +(query.limit || 10),
    sort: (query.sort &&
    [
        "id",
        "first_name",
        "last_name",
        "middle_name",
        "birth_date",
        "position",
        "force_refresh",
        "team_id"
    ].includes(query.sort)
        ? query.sort
        : "id") as keyof PlayerRows,
    order: (query.order && ["ASC", "DESC"].includes(query.order)
        ? query.order
        : "ASC ") as "ASC" | "DESC",
    search: query.search || ""
});

export default parsePlayerGetAllParams;
