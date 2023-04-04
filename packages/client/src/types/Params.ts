import type Data from "./Data";
import type Include from "./Include";

type Params = {
    range: [number, number];
    sort?: Array<[keyof Data, "asc" | "desc"]>;
    filter?: Array<Array<[string, "like" | "equal" | "more" | "less", string]>>;
    include?: Array<Include>;
    includeMany?: Array<Include>;
};

export default Params;
