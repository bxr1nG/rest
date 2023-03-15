import type { CSSProperties } from "react";

export const stylesBuilder = (
    colorBgContainer: string,
    isCentered?: boolean
) => {
    const addition = isCentered
        ? {
              alignItems: "center",
              justifyContent: "center"
          }
        : {};

    const styles: Record<string, CSSProperties> = {
        layout: { height: "100vh", width: "100vw" },
        content: {
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            ...addition
        }
    };

    return styles;
};
