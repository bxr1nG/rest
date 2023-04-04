import React from "react";
import { Table, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import type Data from "~/types/Data";
import Wrapper from "~/components/Wrapper";
import useViewport from "~/hooks/useViewport";
import useNotification from "~/hooks/useNotification";

import { styles } from "./constants";

const { Column } = Table;

type IdProps = Record<string, never>;

const Id: React.FC<IdProps> = () => {
    const { isMobile } = useViewport();
    const { onError } = useNotification();

    const { table, id, idColumn } = useParams() as {
        table: string;
        id: string;
        idColumn: string | undefined;
    };
    const navigate = useNavigate();

    const { isFetching, data } = useQuery({
        queryKey: [table, id, idColumn],
        queryFn: async () => {
            const response = await axios.get(
                idColumn
                    ? `/api/table/${table}/${id}/${idColumn}`
                    : `/api/table/${table}/${id}`
            );
            const data = response.data as Data;
            return Object.keys(data).map((key) => ({
                name: key,
                value: data[key]
            }));
        },
        onError
    });

    return (
        <Wrapper>
            <Button
                type="primary"
                icon={<ArrowLeftOutlined />}
                onClick={() => {
                    navigate(-1);
                }}
                style={styles.button}
            >
                {isMobile ? "" : "Back"}
            </Button>
            <Table
                dataSource={data}
                pagination={false}
                rowKey="name"
                loading={isFetching}
                style={styles.table}
                size={isMobile ? "small" : "large"}
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
        </Wrapper>
    );
};

export default Id;
