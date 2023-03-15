import type Rows from "./Rows";

type Params = {
    page?: string;
    limit?: string;
    sort?: string;
    order?: string;
    search?: string;
    fields?: Array<keyof Rows>;
};

export default Params;
