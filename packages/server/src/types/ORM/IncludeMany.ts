import type ParsedParams from "~/types/ParsedParams";

import type Include from "./Include";

type IncludeMany = {
    params?: ParsedParams;
} & Include;

export default IncludeMany;
