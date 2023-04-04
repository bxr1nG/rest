import React, { useState } from "react";
import {
    Button,
    Drawer,
    Modal,
    Form,
    Input,
    Radio,
    Divider,
    Card,
    Space,
    Descriptions,
    Popconfirm,
    AutoComplete,
    Select
} from "antd";
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";

import type Include from "~/types/Include";
import useParsedSearchParams from "~/hooks/useParsedSearchParams";
import useTableNames from "~/hooks/useTableNames";
import useTableColumns from "~/hooks/useTableColumns";
import autoCompleteFilter from "~/utils/autoCompleteFilter";
import columnToObject from "~/utils/columnToObject";

const { Option } = Select;

type IncludesProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    fields: Array<string>;
};

const Includes: React.FC<IncludesProps> = (props) => {
    const { open, setOpen, fields } = props;

    const { params, setParams } = useParsedSearchParams();
    const { tables } = useTableNames();
    const { columns, setTableName } = useTableColumns("");

    const [form] = Form.useForm<{
        isMany: boolean;
        sourceColumn: string;
        targetTable: string;
        targetColumn: string;
        alias: string | undefined;
    }>();

    const onClose = () => {
        setOpen(false);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleSubmit = (values: {
        isMany: boolean;
        sourceColumn: string;
        targetTable: string;
        targetColumn: string;
        alias: string | undefined;
    }) => {
        if (values.isMany) {
            setParams((prevState) => ({
                ...prevState,
                includeMany: [
                    ...(prevState.includeMany ? prevState.includeMany : []),
                    {
                        ...values,
                        isMany: undefined
                    }
                ]
            }));
        } else {
            setParams((prevState) => ({
                ...prevState,
                include: [
                    ...(prevState.include ? prevState.include : []),
                    {
                        ...values,
                        isMany: undefined
                    }
                ]
            }));
        }

        form.resetFields();
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    const removeInclude = (include: Include, isMany: boolean) => {
        if (isMany) {
            setParams((prevState) => ({
                ...prevState,
                includeMany:
                    prevState.includeMany && prevState.includeMany.length > 1
                        ? prevState.includeMany.filter(
                              (currentInclude) =>
                                  JSON.stringify(currentInclude) !==
                                  JSON.stringify(include)
                          )
                        : undefined
            }));
        } else {
            setParams((prevState) => ({
                ...prevState,
                include:
                    prevState.include && prevState.include.length > 1
                        ? prevState.include.filter(
                              (currentInclude) =>
                                  JSON.stringify(currentInclude) !==
                                  JSON.stringify(include)
                          )
                        : undefined
            }));
        }
    };

    return (
        <Drawer
            title="Manage includes"
            placement="right"
            onClose={onClose}
            open={open}
        >
            <Space
                direction="vertical"
                style={{ display: "flex" }}
            >
                <Button
                    type="dashed"
                    block
                    icon={<PlusCircleOutlined />}
                    onClick={showModal}
                >
                    Add include
                </Button>

                {!!params.include && <Divider>Includes</Divider>}
                {!!params.include &&
                    params.include.map((include, index) => (
                        <Card
                            key={`one-${index}`}
                            size="small"
                            title={include.alias || include.targetTable}
                            extra={[
                                <Popconfirm
                                    title="Are you sure to remove this include?"
                                    description="Remove include"
                                    onConfirm={() =>
                                        removeInclude(include, false)
                                    }
                                    okText="Yes"
                                    cancelText="No"
                                    key="delete"
                                >
                                    <Button
                                        type="link"
                                        icon={<DeleteOutlined />}
                                    />{" "}
                                </Popconfirm>
                            ]}
                        >
                            <Descriptions
                                size="small"
                                column={1}
                            >
                                <Descriptions.Item label="Source column">
                                    {include.sourceColumn}
                                </Descriptions.Item>
                                <Descriptions.Item label="Target table">
                                    {include.targetTable}
                                </Descriptions.Item>
                                <Descriptions.Item label="Target column">
                                    {include.targetColumn}
                                </Descriptions.Item>
                                {!!include.alias && (
                                    <Descriptions.Item label="Alias">
                                        {include.alias}
                                    </Descriptions.Item>
                                )}
                            </Descriptions>
                        </Card>
                    ))}

                {!!params.includeMany && <Divider>Many includes</Divider>}
                {!!params.includeMany &&
                    params.includeMany.map((include, index) => (
                        <Card
                            key={`many-${index}`}
                            size="small"
                            title={include.alias || include.targetTable}
                            extra={[
                                <Popconfirm
                                    title="Are you sure to remove this include?"
                                    description="Remove include"
                                    onConfirm={() =>
                                        removeInclude(include, true)
                                    }
                                    okText="Yes"
                                    cancelText="No"
                                    key="delete"
                                >
                                    <Button
                                        type="link"
                                        icon={<DeleteOutlined />}
                                    />{" "}
                                </Popconfirm>
                            ]}
                        >
                            <Descriptions
                                size="small"
                                column={1}
                            >
                                <Descriptions.Item label="Source column">
                                    {include.sourceColumn}
                                </Descriptions.Item>
                                <Descriptions.Item label="Target table">
                                    {include.targetTable}
                                </Descriptions.Item>
                                <Descriptions.Item label="Target column">
                                    {include.targetColumn}
                                </Descriptions.Item>
                                {!!include.alias && (
                                    <Descriptions.Item label="Alias">
                                        {include.alias}
                                    </Descriptions.Item>
                                )}
                            </Descriptions>
                        </Card>
                    ))}
            </Space>
            <Modal
                title="Add include"
                open={isModalOpen}
                onOk={form.submit}
                onCancel={handleCancel}
            >
                <Divider />
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    autoComplete="off"
                >
                    <Form.Item
                        name="isMany"
                        initialValue={false}
                    >
                        <Radio.Group>
                            <Radio value={false}>One</Radio>
                            <Radio value={true}>Many</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        name="sourceColumn"
                        rules={[
                            {
                                required: true,
                                message: "Source column required"
                            }
                        ]}
                    >
                        <Select placeholder="Source column">
                            {fields.map((field) => (
                                <Option
                                    key={field}
                                    value={field}
                                >
                                    {field}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="targetTable"
                        rules={[
                            { required: true, message: "Target table required" }
                        ]}
                    >
                        <AutoComplete
                            onBlur={(e) =>
                                setTableName(
                                    (e.target as HTMLTextAreaElement).value
                                )
                            }
                            options={tables.map(columnToObject)}
                            filterOption={autoCompleteFilter}
                            placeholder="Target table"
                        />
                    </Form.Item>
                    <Form.Item
                        name="targetColumn"
                        rules={[
                            {
                                required: true,
                                message: "Target column required"
                            }
                        ]}
                    >
                        <AutoComplete
                            filterOption={autoCompleteFilter}
                            options={columns.map(columnToObject)}
                            placeholder="Target column"
                        />
                    </Form.Item>
                    <Form.Item name="alias">
                        <Input placeholder="Alias" />
                    </Form.Item>
                </Form>
            </Modal>
        </Drawer>
    );
};

export default Includes;
