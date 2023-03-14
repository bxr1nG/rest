import type { PaginationProps, TableProps as AntTableProps } from "antd";
import type { SorterResult } from "antd/es/table/interface";

import React, { useState } from "react";
import {
    Layout,
    theme,
    Table as AntTable,
    Pagination,
    Input,
    Button,
    Space
} from "antd";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams, Link } from "react-router-dom";
import axios from "axios";

import type DataObject from "~/types/DataObject";
import type Data from "~/types/Data";

const { Column } = AntTable;
const { Content } = Layout;
const { Search } = Input;

type TableProps = Record<string, never>;

const Table: React.FC<TableProps> = () => {
    const { table } = useParams();

    const [searchParams, setSearchParams] = useSearchParams();
    const parsedSearchParams = {
        page: searchParams.get("page"),
        limit: searchParams.get("limit"),
        search: searchParams.get("search"),
        sort: searchParams.get("sort"),
        order: searchParams.get("order")
    };

    const [params, setParams] = useState<{
        page: number;
        limit: number;
        search: string;
        sort: string | undefined;
        order: string | undefined;
    }>({
        page: parsedSearchParams.page ? +parsedSearchParams.page : 0,
        limit: parsedSearchParams.limit ? +parsedSearchParams.limit : 10,
        search: parsedSearchParams.search ?? "",
        sort: parsedSearchParams.sort ?? undefined,
        order: parsedSearchParams.order ?? undefined
    });
    const { isFetching, data } = useQuery({
        queryKey: [table, params],
        queryFn: async () => {
            setSearchParams({
                ...{
                    page: params.page.toString(),
                    limit: params.limit.toString(),
                    search: params.search
                },
                ...(params.sort ? { sort: params.sort } : {}),
                ...(params.order ? { order: params.order } : {})
            });
            const response = await axios.get(`/api/${table as string}`, {
                params
            });
            return response.data as DataObject;
        },
        keepPreviousData: true
    });

    const {
        token: { colorBgContainer }
    } = theme.useToken();

    const onPaginationChange: PaginationProps["onChange"] = (page) => {
        setParams((prevState) => ({ ...prevState, page: page - 1 }));
    };

    const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
        _current,
        pageSize
    ) => {
        setParams((prevState) => ({ ...prevState, limit: pageSize, page: 0 }));
    };

    const onSearch = (value: string) => {
        setParams((prevState) => ({ ...prevState, search: value, page: 0 }));
    };

    const onTableChange: AntTableProps<Data>["onChange"] = (
        _pagination,
        _filters,
        sorter
    ) => {
        const { order, field, column } = sorter as SorterResult<Data>;
        setParams((prevState) => ({
            ...prevState,
            sort: column ? (field as string) : undefined,
            order: order ? (order === "ascend" ? "ASC" : "DESC") : undefined,
            page: 0
        }));
    };

    const onButtonClick = () => {
        setParams((prevState) => ({
            ...prevState,
            search: "",
            page: 0,
            order: undefined,
            sort: undefined
        }));
        setInputValue("");
    };

    const [inputValue, setInputValue] = useState("");

    return (
        <Layout style={{ height: "100vh", width: "100vw" }}>
            <Content
                style={{
                    margin: "24px 16px",
                    padding: 24,
                    background: colorBgContainer,
                    display: "flex",
                    flexDirection: "column",
                    gap: 16
                }}
            >
                <Space
                    direction="horizontal"
                    size="middle"
                >
                    <Link to="/">
                        <Button
                            type="primary"
                            icon={<ArrowLeftOutlined />}
                        >
                            Home
                        </Button>
                    </Link>
                    <Search
                        placeholder="Search by name"
                        defaultValue={params.search}
                        allowClear
                        onSearch={onSearch}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <Button onClick={onButtonClick}>Reset all</Button>
                </Space>
                <AntTable
                    dataSource={data?.data}
                    pagination={false}
                    rowKey="id"
                    loading={isFetching}
                    onChange={onTableChange}
                    style={{ overflow: "scroll" }}
                >
                    {Object.keys(data?.data[0] ?? {}).map((column) => (
                        <Column
                            title={column}
                            dataIndex={column}
                            key={column}
                            sorter
                            sortOrder={
                                params.sort === column
                                    ? params.order === "ASC"
                                        ? "ascend"
                                        : "descend"
                                    : undefined
                            }
                        />
                    ))}
                    <Column
                        render={(value) => {
                            return (
                                <Link
                                    to={`/${table as string}/${
                                        (value as Data)["id"]
                                    }`}
                                >
                                    <Button
                                        shape="circle"
                                        icon={<ArrowRightOutlined />}
                                    />
                                </Link>
                            );
                        }}
                    />
                </AntTable>
                <Pagination
                    showSizeChanger
                    onShowSizeChange={onShowSizeChange}
                    pageSize={params.limit}
                    current={params.page + 1}
                    onChange={onPaginationChange}
                    total={data?.count}
                />
            </Content>
        </Layout>
    );
};

export default Table;
