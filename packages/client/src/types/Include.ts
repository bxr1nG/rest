import type Data from "./Data";
import type Params from "./Params";

type Include = {
    sourceColumn: keyof Data;
    targetTable: string;
    targetColumn: keyof Data;
    alias?: string;
    params?: Params;
};

export default Include;
