import React from "react";
import { Button, Form, Input, Space, Switch } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import Wrapper from "~/components/Wrapper";

import { styles } from "./constants";

const { Compact } = Space;

type HomeProps = {
    handleThemeChange: () => void;
    isDarkMode: boolean;
};

const Home: React.FC<HomeProps> = (props) => {
    const { handleThemeChange, isDarkMode } = props;

    const navigate = useNavigate();

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

    return (
        <Wrapper center>
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
                        <Input
                            placeholder="table"
                            style={styles.input}
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
