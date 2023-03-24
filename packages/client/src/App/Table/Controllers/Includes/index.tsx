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
    Popconfirm
} from "antd";
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";

import type Params from "~/types/Params";
import type Include from "~/types/Include";

type IncludesProps = {
    params: Params;
    setParams: React.Dispatch<React.SetStateAction<Params>>;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Includes: React.FC<IncludesProps> = (props) => {
    const { params, setParams, open, setOpen } = props;

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
                        <Input placeholder="Source column" />
                    </Form.Item>
                    <Form.Item
                        name="targetTable"
                        rules={[
                            { required: true, message: "Target table required" }
                        ]}
                    >
                        <Input placeholder="Target table" />
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
                        <Input placeholder="Target column" />
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
