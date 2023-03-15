import type Rows from "./Rows";

type ParsedParams = {
    page: number;
    limit: number;
    sort: keyof Rows;
    order: "ASC" | "DESC";
    search: string;
    fields: Array<keyof Rows>;
};

export default ParsedParams;
