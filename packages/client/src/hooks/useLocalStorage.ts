import type React from "react";

import { useState, useEffect } from "react";

const useLocalStorage = (
    key: string,
    defaultValue: boolean
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
    const [value, setValue] = useState(() => {
        let currentValue;

        try {
            currentValue = JSON.parse(
                localStorage.getItem(key) || String(defaultValue)
            ) as boolean;
        } catch (error) {
            currentValue = defaultValue;
        }

        return currentValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
};

export default useLocalStorage;
