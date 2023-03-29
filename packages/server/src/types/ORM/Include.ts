import type IncludeParams from "~/types/IncludeParams";

import type DefaultInclude from "./DefaultInclude";

type Include = {
    params?: IncludeParams;
} & DefaultInclude;

export default Include;
