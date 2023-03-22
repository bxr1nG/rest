import type Include from "./ORM/Include";
import type Rows from "./Rows";

type ParsedParams = {
    range?: [number, number];
    sort?: Array<[keyof Rows, "asc" | "desc"]>;
    filter?: Array<[string, Array<string | number | Date>]>;
    include?: Array<Include>;
    includeMany?: Array<Include>;
};

export default ParsedParams;
