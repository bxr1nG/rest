import type Rows from "~/types/Rows";
import type ParsedParams from "~/types/ParsedParams";

type Include = {
    sourceColumn: keyof Rows;
    targetTable: string;
    targetColumn: keyof Rows;
    alias?: string;
    params?: ParsedParams;
};

export default Include;
