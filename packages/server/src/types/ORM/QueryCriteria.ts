import type Include from "~/types/ORM/Include";

type QueryCriteria = {
    where: Array<[string, Array<string | number | Date>]>;
    order: Array<[string, "asc" | "desc"]>;
    range: [number, number] | undefined;
    include: Array<Include>;
    includeMany: Array<Include>;
};

export default QueryCriteria;
