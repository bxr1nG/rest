import type Rows from "~/types/Rows";

type ParsedParams = {
    page: number;
    limit: number;
    sort: keyof Rows;
    order: "ASC" | "DESC";
    search: string;
};

export default ParsedParams;
