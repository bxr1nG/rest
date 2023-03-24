import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import type Params from "~/types/Params";
import {
    parseSearchParams,
    stringifySearchParams
} from "~/utils/SearchParamsParser";

const useParsedSearchParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [params, setParams] = useState<Params>(
        parseSearchParams(searchParams)
    );

    useEffect(() => {
        setSearchParams(stringifySearchParams(params));
    }, [params]);

    return { params, setParams };
};

export default useParsedSearchParams;
