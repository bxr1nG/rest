import type Include from "./ORM/Include";
import type IncludeMany from "./ORM/IncludeMany";

type IncludeParams = {
    include?: Array<Include>;
    includeMany?: Array<IncludeMany>;
};

export default IncludeParams;
