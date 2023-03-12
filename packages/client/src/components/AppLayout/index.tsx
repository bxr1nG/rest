import React from "react";
import { Layout, Menu } from "antd";
import { Outlet } from "react-router-dom";

import { items, styles } from "./constants";

const { Sider } = Layout;

type AppLayoutProps = Record<string, never>;

const AppLayout: React.FC<AppLayoutProps> = () => {
    return (
        <Layout>
            <Sider
                collapsed
                style={styles.sider}
            >
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["players"]}
                    items={items}
                />
            </Sider>
            <Layout style={styles.layout}>
                <Outlet />
            </Layout>
        </Layout>
    );
};

export default AppLayout;
