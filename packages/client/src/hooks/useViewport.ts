import { useContext } from "react";

import { viewportContext } from "~/utils/ViewportProvider";

const useViewport = () => {
    const { width, height } = useContext(viewportContext);
    return { width, height };
};

export default useViewport;
