import type PlayerRows from "~/types/PlayerRows";

type PlayerGetAllParsedParams = {
    page: number;
    limit: number;
    sort: keyof PlayerRows;
    order: "ASC" | "DESC";
    search: string;
};

export default PlayerGetAllParsedParams;
