import type { MenuProps } from "antd";

import React, { useState } from "react";
import {
    UserOutlined,
    TeamOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from "@ant-design/icons";
import { Layout, Menu, Typography, theme } from "antd";
import { Link, Outlet } from "react-router-dom";

const { Sider, Header } = Layout;
const { Title } = Typography;

const items: MenuProps["items"] = [
    {
        key: "players",
        icon: React.createElement(UserOutlined),
        label: <Link to="/players">Players</Link>
    },
    {
        key: "teams",
        icon: React.createElement(TeamOutlined),
        label: <Link to="/teams">Teams</Link>
    }
];

type AppLayoutProps = Record<string, never>;

const AppLayout: React.FC<AppLayoutProps> = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer }
    } = theme.useToken();

    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: 16,
                        padding: 4,
                        background: "rgba(255, 255, 255, 0.2)"
                    }}
                >
                    <Title
                        level={3}
                        style={{
                            margin: 0,
                            color: "rgba(255, 255, 255, 0.6)"
                        }}
                    >
                        REST Service
                    </Title>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["0"]}
                    items={items}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    {React.createElement(
                        collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                        {
                            onClick: () => setCollapsed(!collapsed)
                        }
                    )}
                </Header>
                <Outlet />
            </Layout>
        </Layout>
    );
};

export default AppLayout;
