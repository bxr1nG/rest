type QueryCriteria = {
    where: Array<[string, Array<string | number | Date>]>;
    order: Array<[string, "asc" | "desc"]>;
    range: [number, number] | undefined;
};

export default QueryCriteria;
