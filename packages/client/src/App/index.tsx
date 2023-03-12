import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./Home";
import Players from "./Players";

type AppProps = Record<string, never>;

const App: React.FC<AppProps> = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={<Home />}
            >
                <Route
                    index
                    element={<Navigate to="/players" />}
                />
                <Route
                    path="players"
                    element={<Players />}
                />
                <Route
                    path="teams"
                    element={<Players />}
                />
                <Route
                    path="games"
                    element={<Players />}
                />
                <Route
                    path="venues"
                    element={<Players />}
                />
            </Route>
        </Routes>
    );
};

export default App;
