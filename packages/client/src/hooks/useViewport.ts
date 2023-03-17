import { useContext } from "react";

import { viewportContext } from "~/utils/ViewportProvider";

const useViewport = () => {
    const { width, height } = useContext(viewportContext);
    const mobileBreakpoint = 620;
    return { width, height, isMobile: width < mobileBreakpoint };
};

export default useViewport;
