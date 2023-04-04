import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import useNotification from "~/hooks/useNotification";

const useTableColumns = (initialTable: string) => {
    const { onError } = useNotification();

    const [table, setTableName] = useState(initialTable);

    const { data } = useQuery({
        queryKey: [table],
        queryFn: async () => {
            if (table === "") {
                return [];
            }
            const response = await axios.get(`/api/columns/${table}`);
            return response.data as Array<string>;
        },
        onError
    });

    return { columns: data || [], setTableName };
};

export default useTableColumns;
