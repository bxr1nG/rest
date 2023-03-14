import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./Home";
import Table from "./Table";
import Id from "./Id";

type AppProps = Record<string, never>;

const App: React.FC<AppProps> = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={<Home />}
            />
            <Route
                path="/:table"
                element={<Table />}
            />
            <Route
                path="/:table/:id"
                element={<Id />}
            />
        </Routes>
    );
};

export default App;
