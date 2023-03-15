import type { ReactNode } from "react";

import React from "react";
import { Layout, theme } from "antd";

import { stylesBuilder } from "./helpers";

const { Content } = Layout;

type WrapperProps = {
    children: ReactNode;
    center?: boolean;
};

const Wrapper: React.FC<WrapperProps> = (props) => {
    const { children, center } = props;

    const {
        token: { colorBgContainer }
    } = theme.useToken();

    const styles = stylesBuilder(colorBgContainer, center);

    return (
        <Layout style={styles.layout}>
            <Content style={styles.content}>{children}</Content>
        </Layout>
    );
};

export default Wrapper;
