import type Rows from "./Rows";
import type IncludeParams from "./IncludeParams";

type ParsedParams = {
    range?: [number, number];
    sort?: Array<[keyof Rows, "asc" | "desc"]>;
    filter?: Array<[string, Array<string | number | Date>]>;
} & IncludeParams;

export default ParsedParams;
