import type Rows from "./Rows";

type ParsedParams = {
    range?: [number, number];
    sort?: Array<[keyof Rows, "asc" | "desc"]>;
    filter?: Array<[string, Array<string | number | Date>]>;
    include?: Array<{
        sourceColumn: keyof Rows;
        targetTable: string;
        targetColumn: keyof Rows;
        alias: string;
    }>;
};

export default ParsedParams;
