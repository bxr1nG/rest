import React, { useState } from "react";
import {
    Button,
    Drawer,
    Modal,
    Form,
    Input,
    Divider,
    Card,
    Space,
    Descriptions,
    Popconfirm,
    Select
} from "antd";
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";

import type Params from "~/types/Params";

import { filterFilters } from "./helpers";

const { Option } = Select;

type FiltersProps = {
    params: Params;
    setParams: React.Dispatch<React.SetStateAction<Params>>;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    fields: Array<string> | undefined;
};

const Filters: React.FC<FiltersProps> = (props) => {
    const { params, setParams, open, setOpen, fields } = props;

    const [form] = Form.useForm<{
        field: string;
        type: "like" | "equal" | "more" | "less";
        value: string;
    }>();

    const onClose = () => {
        setOpen(false);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleSubmit = (values: {
        field: string;
        type: "like" | "equal" | "more" | "less";
        value: string;
    }) => {
        const newFilter: [string, "like" | "equal" | "more" | "less", string] =
            [values.field, values.type, values.value];

        setParams((prevState) => ({
            ...prevState,
            filter: [...(prevState.filter ? prevState.filter : []), [newFilter]]
        }));

        form.resetFields();
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    const removeFilter = (
        filter: [string, "like" | "equal" | "more" | "less", string]
    ) => {
        setParams((prevState) => ({
            ...prevState,
            filter: prevState.filter
                ? filterFilters(prevState.filter, filter).length
                    ? filterFilters(prevState.filter, filter)
                    : undefined
                : undefined
        }));
    };

    return (
        <Drawer
            title="Manage filters"
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
                    Add filter
                </Button>

                {!!params.filter &&
                    params.filter.map((filterArray, index) => (
                        <div key={index}>
                            {filterArray.map((filter, index) => (
                                <Card
                                    key={index}
                                    size="small"
                                    title={filter[0]}
                                    extra={[
                                        <Popconfirm
                                            title="Are you sure to remove this filter?"
                                            description="Remove filter"
                                            onConfirm={() =>
                                                removeFilter(filter)
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
                                        <Descriptions.Item label="Type">
                                            {filter[1]}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Value">
                                            {filter[2]}
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Card>
                            ))}
                        </div>
                    ))}
            </Space>
            <Modal
                title="Add filter"
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
                        name="field"
                        rules={[{ required: true, message: "Field required" }]}
                    >
                        <Select placeholder="Select a field">
                            {!!fields &&
                                fields.map((field) => (
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
                        name="type"
                        rules={[
                            { required: true, message: "Filter type required" }
                        ]}
                    >
                        <Select placeholder="Select a filter type">
                            <Option value="more">More then</Option>
                            <Option value="less">Less then</Option>
                            <Option value="equal">Equal</Option>
                            <Option value="like">Like</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="value"
                        rules={[
                            {
                                required: true,
                                message: "Value required"
                            }
                        ]}
                    >
                        <Input placeholder="Value" />
                    </Form.Item>
                </Form>
            </Modal>
        </Drawer>
    );
};

export default Filters;
