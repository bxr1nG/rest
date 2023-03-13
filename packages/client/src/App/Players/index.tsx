import type { PaginationProps, TableProps } from "antd";
import type { SorterResult } from "antd/es/table/interface";

import React, { useState } from "react";
import { Layout, theme, Table, Pagination, Input, Button, Space } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import type Player from "~/types/Player";
import api from "~/api";

const { Column } = Table;
const { Content } = Layout;
const { Search } = Input;

type PlayersProps = Record<string, never>;

const Players: React.FC<PlayersProps> = () => {
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
        queryKey: ["players", params],
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
            const data = await api.players.get({
                params
            });
            return data;
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

    const onTableChange: TableProps<Player>["onChange"] = (
        _pagination,
        _filters,
        sorter
    ) => {
        const { order, field, column } = sorter as SorterResult<Player>;
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
        <>
            <Content
                style={{
                    margin: "24px 16px"
                }}
            >
                <Space
                    direction="vertical"
                    size="middle"
                    style={{
                        padding: 24,
                        background: colorBgContainer,
                        width: "100%"
                    }}
                >
                    <Space
                        direction="horizontal"
                        size="middle"
                    >
                        <Search
                            placeholder="Search by name"
                            defaultValue={params.search}
                            allowClear
                            onSearch={onSearch}
                            style={{ maxWidth: 400 }}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <Button onClick={onButtonClick}>Reset all</Button>
                    </Space>
                    <Table
                        dataSource={data?.data}
                        pagination={false}
                        rowKey="id"
                        loading={isFetching}
                        onChange={onTableChange}
                    >
                        <Column
                            title="First Name"
                            dataIndex="first_name"
                            key="first_name"
                            sorter
                            sortOrder={
                                params.sort === "first_name"
                                    ? params.order === "ASC"
                                        ? "ascend"
                                        : "descend"
                                    : undefined
                            }
                        />
                        <Column
                            title="Last Name"
                            dataIndex="last_name"
                            key="last_name"
                            sorter
                            sortOrder={
                                params.sort === "last_name"
                                    ? params.order === "ASC"
                                        ? "ascend"
                                        : "descend"
                                    : undefined
                            }
                        />
                        <Column
                            title="Middle Name"
                            dataIndex="middle_name"
                            key="middle_name"
                            sorter
                            sortOrder={
                                params.sort === "middle_name"
                                    ? params.order === "ASC"
                                        ? "ascend"
                                        : "descend"
                                    : undefined
                            }
                        />
                        <Column
                            title="Birth Date"
                            dataIndex="birth_date"
                            key="birth_date"
                            sorter
                            sortOrder={
                                params.sort === "birth_date"
                                    ? params.order === "ASC"
                                        ? "ascend"
                                        : "descend"
                                    : undefined
                            }
                        />
                        <Column
                            title="Position"
                            dataIndex="position"
                            key="position"
                            sorter
                            sortOrder={
                                params.sort === "position"
                                    ? params.order === "ASC"
                                        ? "ascend"
                                        : "descend"
                                    : undefined
                            }
                        />
                        <Column
                            title="Force Refresh"
                            dataIndex="force_refresh"
                            key="force_refresh"
                            sorter
                            sortOrder={
                                params.sort === "force_refresh"
                                    ? params.order === "ASC"
                                        ? "ascend"
                                        : "descend"
                                    : undefined
                            }
                        />
                    </Table>
                    <Pagination
                        showSizeChanger
                        onShowSizeChange={onShowSizeChange}
                        pageSize={params.limit}
                        current={params.page + 1}
                        onChange={onPaginationChange}
                        total={data?.count}
                    />
                </Space>
            </Content>
        </>
    );
};

export default Players;
