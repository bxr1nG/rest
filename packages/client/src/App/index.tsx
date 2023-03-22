import React from "react";
import { Route, Routes } from "react-router-dom";
import { ConfigProvider, theme } from "antd";

import useLocalStorage from "~/hooks/useLocalStorage";

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
        </ConfigProvider>
    );
};

export default App;
