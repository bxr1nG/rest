import type ParsedParams from "~/types/ParsedParams";

import type DefaultInclude from "./DefaultInclude";

type IncludeMany = {
    params?: ParsedParams;
} & DefaultInclude;

export default IncludeMany;
