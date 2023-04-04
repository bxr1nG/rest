export const filterFilters = (
    filterParam: Array<
        Array<[string, "like" | "equal" | "more" | "less", string]>
    >,
    filter: [string, "like" | "equal" | "more" | "less", string]
): Array<Array<[string, "like" | "equal" | "more" | "less", string]>> =>
    filterParam
        .map((filterArray) =>
            filterArray.filter(
                (currentFilter) =>
                    JSON.stringify(currentFilter) !== JSON.stringify(filter)
            )
        )
        .filter((filterArray) => filterArray.length);
