import React, { createContext, useEffect, useState } from "react";
import { Outlet, useSearchParams } from "react-router-dom";

import type Params from "~/types/Params";
import {
    parseSearchParams,
    stringifySearchParams
} from "~/utils/SearchParamsParser";

export const parsedSearchParamsContext = createContext<
    | {
          params: Params;
          setParams: React.Dispatch<React.SetStateAction<Params>>;
      }
    | undefined
>(undefined);

type ParsedSearchParamsProviderProps = Record<string, never>;

const ParsedSearchParamsProvider: React.FC<
    ParsedSearchParamsProviderProps
> = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [params, setParams] = useState<Params>(
        parseSearchParams(searchParams)
    );

    useEffect(() => {
        setSearchParams(stringifySearchParams(params));
    }, [params]);

    return (
        <parsedSearchParamsContext.Provider value={{ params, setParams }}>
            <Outlet />
        </parsedSearchParamsContext.Provider>
    );
};

export default ParsedSearchParamsProvider;
