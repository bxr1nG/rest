import React from "react";
import { Route, Routes } from "react-router-dom";
import { ConfigProvider, theme } from "antd";

import useLocalStorage from "~/hooks/useLocalStorage";
import NotificationProvider from "~/providers/NotificationProvider";
import TableNamesProvider from "~/providers/TableNamesProvider";
import ParsedSearchParamsProvider from "~/providers/ParsedSearchParamsProvider";

import Home from "./Home";
import Table from "./Table";
import Id from "./Id";

const { defaultAlgorithm, darkAlgorithm } = theme;

type AppProps = Record<string, never>;

const App: React.FC<AppProps> = () => {
    const [isDarkMode, setIsDarkMode] = useLocalStorage("theme", false);

    const handleThemeChange = () => {
        setIsDarkMode((previousValue) => !previousValue);
    };

    return (
        <ConfigProvider
            theme={{
                algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
                token: {
                    colorPrimary: "DodgerBlue"
                }
            }}
        >
            <ParsedSearchParamsProvider>
                <NotificationProvider>
                    <TableNamesProvider>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Home
                                        handleThemeChange={handleThemeChange}
                                        isDarkMode={isDarkMode}
                                    />
                                }
                            />
                            <Route
                                path="/:table"
                                element={<Table />}
                            />
                            <Route
                                path="/:table/:id/:idColumn?"
                                element={<Id />}
                            />
                        </Routes>
                    </TableNamesProvider>
                </NotificationProvider>
            </ParsedSearchParamsProvider>
        </ConfigProvider>
    );
};

export default App;
