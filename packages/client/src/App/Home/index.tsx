import React from "react";
import {
    AutoComplete,
    Button,
    Form,
    Input,
    notification,
    Space,
    Switch
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import Wrapper from "~/components/Wrapper";
import useViewport from "~/hooks/useViewport";

import { styles } from "./constants";

const { Compact } = Space;

type HomeProps = {
    handleThemeChange: () => void;
    isDarkMode: boolean;
};

const Home: React.FC<HomeProps> = (props) => {
    const { handleThemeChange, isDarkMode } = props;
    const { isMobile } = useViewport();

    const navigate = useNavigate();

    const [api, contextHolder] = notification.useNotification();

    const openNotification = (message: string, description?: string) => {
        api.error({
            message,
            description
        });
    };

    const onFinish = (values: {
        table: string;
        id: string | undefined;
        idColumn: string | undefined;
    }) => {
        const { table, id, idColumn } = values;
        navigate(
            id
                ? idColumn
                    ? `/${table}/${id}/${idColumn}`
                    : `/${table}/${id}`
                : `/${table}`
        );
    };

    const { data } = useQuery({
        queryKey: [],
        queryFn: async () => {
            const response = await axios.get("/api/tables");
            return response.data as Array<string>;
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                const data = err.response?.data as {
                    message: string;
                    status: number;
                    stack?: string;
                };
                console.info(data);
                openNotification(`${data.status} ${data.message}`);
            } else {
                openNotification("Unknown error");
            }
        }
    });

    return (
        <Wrapper center>
            {contextHolder}
            <Switch
                checkedChildren={"Dark Theme"}
                unCheckedChildren={"Light Theme"}
                checked={isDarkMode}
                onChange={handleThemeChange}
            />
            <Form
                onFinish={onFinish}
                autoComplete="off"
            >
                <Compact>
                    <Form.Item
                        name="table"
                        rules={[
                            { required: true, message: "Table name required" }
                        ]}
                    >
                        <AutoComplete
                            options={(data || []).map((str) => ({
                                value: str
                            }))}
                            placeholder="table"
                            style={isMobile ? styles.mobileInput : styles.input}
                        />
                    </Form.Item>
                    <Space
                        direction="vertical"
                        size={0}
                    >
                        <Form.Item
                            name="id"
                            style={styles.marginZero}
                        >
                            <Input
                                placeholder="id"
                                style={styles.inputId}
                            />
                        </Form.Item>
                        <Form.Item name="idColumn">
                            <Input
                                placeholder="idColumn"
                                style={styles.inputId}
                            />
                        </Form.Item>
                    </Space>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<SearchOutlined />}
                        />
                    </Form.Item>
                </Compact>
            </Form>
        </Wrapper>
    );
};

export default Home;
