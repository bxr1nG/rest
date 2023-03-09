import React from "react";
import { Layout, theme } from "antd";

const { Content, Footer } = Layout;

type PlayersProps = Record<string, never>;

const Players: React.FC<PlayersProps> = () => {
    const {
        token: { colorBgContainer }
    } = theme.useToken();

    return (
        <>
            <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
                <div
                    style={{
                        padding: 24,
                        textAlign: "center",
                        background: colorBgContainer
                    }}
                >
                    <p>long content</p>
                    {
                        // indicates very long content
                        Array.from({ length: 100 }, (_, index) => (
                            <React.Fragment key={index}>
                                {index % 20 === 0 && index ? "more" : "..."}
                                <br />
                            </React.Fragment>
                        ))
                    }
                </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
                Ant Design ©2023 Created by Ant UED
            </Footer>
        </>
    );
};

export default Players;
