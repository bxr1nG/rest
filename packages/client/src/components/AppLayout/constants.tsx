import type { MenuProps } from "antd";

import React from "react";
import {
    GlobalOutlined,
    TeamOutlined,
    ThunderboltOutlined,
    UserOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";

export const styles: Record<string, React.CSSProperties> = {
    sider: {
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0
    },
    layout: { marginLeft: 80 }
};

export const items: MenuProps["items"] = [
    {
        key: "players",
        icon: <UserOutlined />,
        label: <Link to="/players">Players</Link>
    },
    {
        key: "teams",
        icon: <TeamOutlined />,
        label: <Link to="/teams">Teams</Link>
    },
    {
        key: "games",
        icon: <ThunderboltOutlined />,
        label: <Link to="/games">Games</Link>
    },
    {
        key: "venues",
        icon: <GlobalOutlined />,
        label: <Link to="/venues">Venues</Link>
    }
];
