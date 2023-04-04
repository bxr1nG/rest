import { useContext } from "react";

import { parsedSearchParamsContext } from "~/providers/ParsedSearchParamsProvider";

const useParsedSearchParams = () => {
    const context = useContext(parsedSearchParamsContext);

    if (!context) {
        throw new Error(
            "No parsedSearchParamsContext.Provider found when calling useParsedSearchParams."
        );
    }

    return context;
};

export default useParsedSearchParams;
