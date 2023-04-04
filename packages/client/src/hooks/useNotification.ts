import { useContext } from "react";

import { notificationContext } from "~/providers/NotificationProvider";
import onQueryError from "~/utils/OnQueryError";

const useNotification = () => {
    const api = useContext(notificationContext);

    if (!api) {
        throw new Error(
            "No notificationContext.Provider found when calling useNotification."
        );
    }

    const openError = (message: string, description?: string) => {
        api.error({
            message,
            description
        });
    };

    const onError = (err: unknown) => {
        onQueryError(err, openError);
    };

    return { api, openError, onError };
};

export default useNotification;
