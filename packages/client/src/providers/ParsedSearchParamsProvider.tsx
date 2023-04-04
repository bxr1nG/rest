import type { ReactNode } from "react";

import React, { createContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

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

type ParsedSearchParamsProviderProps = {
    children: ReactNode;
};

const ParsedSearchParamsProvider: React.FC<ParsedSearchParamsProviderProps> = (
    props
) => {
    const { children } = props;

    const [searchParams, setSearchParams] = useSearchParams();

    const [params, setParams] = useState<Params>(
        parseSearchParams(searchParams)
    );

    useEffect(() => {
        setSearchParams(stringifySearchParams(params));
    }, [params]);

    return (
        <parsedSearchParamsContext.Provider value={{ params, setParams }}>
            {children}
        </parsedSearchParamsContext.Provider>
    );
};

export default ParsedSearchParamsProvider;
