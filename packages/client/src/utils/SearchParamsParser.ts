import type Include from "~/types/Include";
import type Params from "~/types/Params";

export const parseSearchParams = (searchParams: URLSearchParams): Params => {
    const parsedSearchParams = {
        range: searchParams.get("range"),
        sort: searchParams.get("sort"),
        filter: searchParams.get("filter"),
        include: searchParams.get("include"),
        includeMany: searchParams.get("includeMany")
    };
    return {
        range: parsedSearchParams.range
            ? (JSON.parse(parsedSearchParams.range) as [number, number])
            : [10, 0],
        sort: parsedSearchParams.sort
            ? (JSON.parse(parsedSearchParams.sort) as Array<
                  [string, "asc" | "desc"]
              >)
            : undefined,
        filter: parsedSearchParams.filter
            ? (JSON.parse(parsedSearchParams.filter) as Array<
                  [string, (string | number | Date)[]]
              >)
            : undefined,
        include: parsedSearchParams.include
            ? (JSON.parse(parsedSearchParams.include) as Array<Include>)
            : undefined,
        includeMany: parsedSearchParams.includeMany
            ? (JSON.parse(parsedSearchParams.includeMany) as Array<Include>)
            : undefined
    };
};

export const stringifySearchParams = (params: Params) => {
    return {
        ...{
            range: JSON.stringify(params.range)
        },
        ...(params.sort ? { sort: JSON.stringify(params.sort) } : {}),
        ...(params.filter ? { filter: JSON.stringify(params.filter) } : {}),
        ...(params.include ? { include: JSON.stringify(params.include) } : {}),
        ...(params.includeMany
            ? { includeMany: JSON.stringify(params.includeMany) }
            : {})
    };
};
