import type Include from "~/types/ORM/Include";
import type IncludeMany from "~/types/ORM/IncludeMany";

type QueryCriteria = {
    where: Array<Array<[string, "like" | "equal" | "more" | "less", string]>>;
    order: Array<[string, "asc" | "desc"]>;
    range: [number, number] | undefined;
    include: Array<Include>;
    includeMany: Array<IncludeMany>;
};

export default QueryCriteria;
