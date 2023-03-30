import type Rows from "./Rows";
import type IncludeParams from "./IncludeParams";

type ParsedParams = {
    range?: [number, number];
    sort?: Array<[keyof Rows, "asc" | "desc"]>;
    filter?: Array<
        Array<[keyof Rows, "like" | "equal" | "more" | "less", string]>
    >;
} & IncludeParams;

export default ParsedParams;
