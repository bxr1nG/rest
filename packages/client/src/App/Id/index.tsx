import React from "react";
import { Table, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import type Data from "~/types/Data";
import Wrapper from "~/components/Wrapper";

import { styles } from "./constants";

const { Column } = Table;

type IdProps = Record<string, never>;

const Id: React.FC<IdProps> = () => {
    const { table, id } = useParams() as { table: string; id: string };
    const navigate = useNavigate();

    const { isFetching, data } = useQuery({
        queryKey: [table, id],
        queryFn: async () => {
            const response = await axios.get(`/api/${table}/${id}`);
            const data = response.data as Data;
            return Object.keys(data).map((key) => ({
                name: key,
                value: data[key]
            }));
        },
        keepPreviousData: true
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
                Back
            </Button>
            <Table
                dataSource={data}
                pagination={false}
                rowKey="name"
                loading={isFetching}
                style={styles.table}
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
