export const sortOrderParser = (
    column: string,
    sorts: Array<[string, "asc" | "desc"]> | undefined
) =>
    sorts
        ? sorts.filter((sort) => sort[0] === column).length
            ? (
                  sorts.filter((sort) => sort[0] === column)[0] as [
                      string,
                      "asc" | "desc"
                  ]
              )[1] === "asc"
                ? "ascend"
                : "descend"
            : undefined
        : undefined;
