import type Params from "~/types/Params";
import type ParsedParams from "~/types/ParsedParams";
import type Rows from "~/types/Rows";
import type Include from "~/types/ORM/Include";

const parseParams = (query: Params): ParsedParams => ({
    range: query.range
        ? (JSON.parse(query.range) as [number, number])
        : undefined,
    sort: query.sort
        ? (JSON.parse(query.sort) as Array<[keyof Rows, "asc" | "desc"]>)
        : undefined,
    filter: query.filter
        ? (JSON.parse(query.filter) as Array<
              Array<[string, "like" | "equal" | "more" | "less", string]>
          >)
        : undefined,
    include: query.include
        ? (JSON.parse(query.include) as Array<Include>)
        : undefined,
    includeMany: query.includeMany
        ? (JSON.parse(query.includeMany) as Array<Include>)
        : undefined
});

export default parseParams;
