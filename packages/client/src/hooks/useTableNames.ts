import { useContext } from "react";

import { tableNamesContext } from "~/utils/TableNamesProvider";

const useTableNames = () => {
    const tables = useContext(tableNamesContext);

    return { tables: tables || [] };
};

export default useTableNames;
