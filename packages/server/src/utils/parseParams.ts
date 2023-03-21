import type Params from "~/types/Params";
import type ParsedParams from "~/types/ParsedParams";
import type Rows from "~/types/Rows";

const parseParams = (query: Params): ParsedParams => ({
    range: query.range
        ? (JSON.parse(query.range) as [number, number])
        : undefined,
    sort: query.sort
        ? (JSON.parse(query.sort) as Array<[keyof Rows, "asc" | "desc"]>)
        : undefined,
    filter: query.filter
        ? (JSON.parse(query.filter) as Array<[string, Array<string>]>)
        : undefined
});

export default parseParams;
