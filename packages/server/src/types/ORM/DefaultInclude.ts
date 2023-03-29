import type Rows from "~/types/Rows";

type DefaultInclude = {
    sourceColumn: keyof Rows;
    targetTable: string;
    targetColumn: keyof Rows;
    alias?: string;
};

export default DefaultInclude;
