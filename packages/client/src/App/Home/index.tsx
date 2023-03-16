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

    const onFinish = (values: { table: string; id: string | undefined }) => {
        const { table, id } = values;
        navigate(id ? `/${table}/${id}` : `/${table}`);
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
                    <Form.Item name="id">
                        <Input
                            placeholder="id"
                            style={styles.inputNumber}
                        />
                    </Form.Item>
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
