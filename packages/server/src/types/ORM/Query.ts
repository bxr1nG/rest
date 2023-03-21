import type QuerySource from "./QuerySource";
import type QueryCriteria from "./QueryCriteria";

type Query = {
    source: QuerySource;
    criteria: QueryCriteria;
};

export default Query;
