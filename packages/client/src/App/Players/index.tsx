import React from "react";
import { Layout, theme, Table } from "antd";
import { useQuery } from "@tanstack/react-query";

import api from "~/api";

const { Column, ColumnGroup } = Table;

const { Content } = Layout;

type PlayersProps = Record<string, never>;

const Players: React.FC<PlayersProps> = () => {
    const { isLoading, data } = useQuery({
        queryKey: ["players"],
        queryFn: api.players.get,
        keepPreviousData: true
    });

    const {
        token: { colorBgContainer }
    } = theme.useToken();

    return (
        <Content style={{ margin: "24px 16px", overflow: "initial" }}>
            <div
                style={{
                    padding: 24,
                    textAlign: "center",
                    background: colorBgContainer
                }}
            >
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <Table dataSource={data?.data}>
                        <ColumnGroup title="Name">
                            <Column
                                title="First Name"
                                dataIndex="first_name"
                                key="first_name"
                            />
                            <Column
                                title="Last Name"
                                dataIndex="last_name"
                                key="last_name"
                            />
                            <Column
                                title="Middle Name"
                                dataIndex="middle_name"
                                key="middle_name"
                            />
                        </ColumnGroup>
                        <Column
                            title="Birth Date"
                            dataIndex="birth_date"
                            key="birth_date"
                        />
                        <Column
                            title="Position"
                            dataIndex="position"
                            key="position"
                        />
                        <Column
                            title="Force Refresh"
                            dataIndex="force_refresh"
                            key="force_refresh"
                        />
                    </Table>
                )}
            </div>
        </Content>
    );
};

export default Players;
