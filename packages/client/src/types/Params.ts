import type Data from "./Data";
import type Include from "./Include";

type Params = {
    range: [number, number];
    sort?: Array<[keyof Data, "asc" | "desc"]>;
    filter?: Array<[string, Array<string | number | Date>]>;
    include?: Array<Include>;
    includeMany?: Array<Include>;
};

export default Params;
