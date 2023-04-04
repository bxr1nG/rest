import type { ReactNode } from "react";

import React, { createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import useNotification from "~/hooks/useNotification";

export const tableNamesContext = createContext<Array<string> | undefined>(
    undefined
);

type TableNamesProviderProps = {
    children: ReactNode;
};

const TableNamesProvider: React.FC<TableNamesProviderProps> = (props) => {
    const { children } = props;

    const { onError } = useNotification();

    const { data } = useQuery({
        queryKey: [],
        queryFn: async () => {
            const response = await axios.get("/api/tables");
            return response.data as Array<string>;
        },
        onError
    });

    return (
        <tableNamesContext.Provider value={data}>
            {children}
        </tableNamesContext.Provider>
    );
};

export default TableNamesProvider;
