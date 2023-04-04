import type { ReactNode } from "react";
import type { NotificationInstance } from "antd/es/notification/interface";

import React, { createContext } from "react";
import { notification } from "antd";

export const notificationContext = createContext<
    NotificationInstance | undefined
>(undefined);

type NotificationProviderProps = {
    children: ReactNode;
};

const NotificationProvider: React.FC<NotificationProviderProps> = (props) => {
    const { children } = props;

    const [api, contextHolder] = notification.useNotification();

    return (
        <notificationContext.Provider value={api}>
            {contextHolder}
            {children}
        </notificationContext.Provider>
    );
};

export default NotificationProvider;
