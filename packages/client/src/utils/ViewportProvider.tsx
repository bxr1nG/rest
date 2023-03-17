import type { ReactNode } from "react";

import React, { createContext, useEffect, useState } from "react";

export const viewportContext = createContext({
    width: 0,
    height: 0
});

type ViewportProviderProps = {
    children: ReactNode;
};

const ViewportProvider: React.FC<ViewportProviderProps> = (props) => {
    const { children } = props;

    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const handleWindowResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };

    useEffect(() => {
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    return (
        <viewportContext.Provider value={{ width, height }}>
            {children}
        </viewportContext.Provider>
    );
};

export default ViewportProvider;
