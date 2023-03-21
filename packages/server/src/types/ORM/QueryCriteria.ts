import type Rows from "~/types/Rows";

type QueryCriteria = {
    where: Array<[string, Array<string | number | Date>]>;
    order: Array<[string, "asc" | "desc"]>;
    range: [number, number] | undefined;
    include: Array<{
        sourceColumn: keyof Rows;
        targetTable: string;
        targetColumn: keyof Rows;
        alias: string;
    }>;
};

export default QueryCriteria;
