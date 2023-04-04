import React from "react";
import { AutoComplete, Button, Form, Input, Space, Switch } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import Wrapper from "~/components/Wrapper";
import useViewport from "~/hooks/useViewport";
import useTableNames from "~/hooks/useTableNames";
import useTableColumns from "~/hooks/useTableColumns";
import autoCompleteFilter from "~/utils/autoCompleteFilter";
import columnToObject from "~/utils/columnToObject";

import { styles } from "./constants";

const { Compact } = Space;

type HomeProps = {
    handleThemeChange: () => void;
    isDarkMode: boolean;
};

const Home: React.FC<HomeProps> = (props) => {
    const { handleThemeChange, isDarkMode } = props;

    const { isMobile } = useViewport();
    const { tables } = useTableNames();
    const { columns, setTableName } = useTableColumns("");

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
                        style={isMobile ? styles.mobileInput : styles.input}
                    >
                        <AutoComplete
                            onBlur={(e) =>
                                setTableName(
                                    (e.target as HTMLTextAreaElement).value
                                )
                            }
                            options={tables.map(columnToObject)}
                            filterOption={autoCompleteFilter}
                            placeholder="table"
                        />
                    </Form.Item>
                    <Space
                        direction="vertical"
                        size={0}
                        style={isMobile ? styles.mobileInputId : styles.inputId}
                    >
                        <Form.Item
                            name="id"
                            style={styles.zeroMargin}
                        >
                            <Input placeholder="id" />
                        </Form.Item>
                        <Form.Item name="idColumn">
                            <AutoComplete
                                filterOption={autoCompleteFilter}
                                options={columns.map(columnToObject)}
                                placeholder="idColumn"
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
