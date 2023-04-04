import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "antd/dist/reset.css";

import ViewportProvider from "~/providers/ViewportProvider";

import App from "./App";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
});

const root = ReactDOM.createRoot(
    document.querySelector("#root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <ViewportProvider>
                    <App />
                </ViewportProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>
);
