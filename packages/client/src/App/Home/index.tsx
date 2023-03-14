import React, { useState } from "react";
import { Button, Input, InputNumber, Layout, Space, theme } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

type HomeProps = Record<string, never>;

const Home: React.FC<HomeProps> = () => {
    const navigate = useNavigate();
    const {
        token: { colorBgContainer }
    } = theme.useToken();

    const [table, setTable] = useState("");
    const [id, setId] = useState<string | null>(null);

    return (
        <Layout style={{ height: "100vh", width: "100vw" }}>
            <Content
                style={{
                    margin: "24px 16px",
                    padding: 24,
                    background: colorBgContainer,
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Space.Compact>
                    <Input
                        placeholder="table"
                        value={table}
                        onChange={(e) => setTable(e.target.value)}
                        style={{
                            maxWidth: 150
                        }}
                    />
                    <InputNumber
                        placeholder="id"
                        value={id}
                        onChange={(value) => setId(value)}
                        style={{
                            maxWidth: 110
                        }}
                    />
                    <Button
                        disabled={table === ""}
                        type="primary"
                        icon={<SearchOutlined />}
                        onClick={() => {
                            navigate(id ? `/${table}/${id}` : `/${table}`);
                        }}
                    />
                </Space.Compact>
            </Content>
        </Layout>
    );
};

export default Home;
