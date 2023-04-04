import { useContext } from "react";

import { tableNamesContext } from "~/providers/TableNamesProvider";

const useTableNames = () => {
    const tables = useContext(tableNamesContext);

    return { tables: tables || [] };
};

export default useTableNames;
