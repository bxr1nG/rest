import type Rows from "~/types/Rows";

type Include = {
    sourceColumn: keyof Rows;
    targetTable: string;
    targetColumn: keyof Rows;
    alias?: string;
};

export default Include;
