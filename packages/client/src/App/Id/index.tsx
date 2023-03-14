import React from "react";
import { Layout, theme, Table as Table, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import type Data from "~/types/Data";

const { Column } = Table;
const { Content } = Layout;

type IdProps = Record<string, never>;

const Id: React.FC<IdProps> = () => {
    const { table, id } = useParams();
    const navigate = useNavigate();

    const { isFetching, data } = useQuery({
        queryKey: [table, id],
        queryFn: async () => {
            const response = await axios.get(
                `/api/${table as string}/${id as string}`
            );
            const data = response.data as Data;
            return Object.keys(data).map((key) => ({
                name: key,
                value: data[key]
            }));
        },
        keepPreviousData: true
    });

    const {
        token: { colorBgContainer }
    } = theme.useToken();

    return (
        <Layout style={{ height: "100vh", width: "100vw" }}>
            <Content
                style={{
                    margin: "24px 16px",
                    padding: 24,
                    background: colorBgContainer,
                    display: "flex",
                    flexDirection: "column",
                    gap: 16
                }}
            >
                <div>
                    <Button
                        type="primary"
                        icon={<ArrowLeftOutlined />}
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        Back
                    </Button>
                </div>
                <Table
                    dataSource={data}
                    pagination={false}
                    rowKey="name"
                    loading={isFetching}
                    style={{ overflow: "scroll" }}
                >
                    {Object.keys(data ? (data[0] ? data[0] : {}) : {}).map(
                        (column) => (
                            <Column
                                title={column}
                                dataIndex={column}
                                key={column}
                            />
                        )
                    )}
                </Table>
            </Content>
        </Layout>
    );
};

export default Id;
