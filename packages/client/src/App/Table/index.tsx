import type { PaginationProps, TableProps as AntTableProps } from "antd";
import type { SorterResult } from "antd/es/table/interface";

import React, { useState } from "react";
import { Table as AntTable, Pagination, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams, Link } from "react-router-dom";
import axios from "axios";

import type DataObject from "~/types/DataObject";
import type Data from "~/types/Data";
import type Params from "~/types/Params";
import Wrapper from "~/components/Wrapper";
import useViewport from "~/hooks/useViewport";

import { styles } from "./constants";
import Controllers from "./Controllers";

const { Column } = AntTable;

type TableProps = Record<string, never>;

const Table: React.FC<TableProps> = () => {
    const { isMobile } = useViewport();

    const { table } = useParams() as { table: string };

    const [searchParams, setSearchParams] = useSearchParams();
    const parsedSearchParams = {
        page: searchParams.get("page"),
        limit: searchParams.get("limit"),
        search: searchParams.get("search"),
        sort: searchParams.get("sort"),
        order: searchParams.get("order")
    };
    const [params, setParams] = useState<Params>({
        page: parsedSearchParams.page ? +parsedSearchParams.page : 0,
        limit: parsedSearchParams.limit ? +parsedSearchParams.limit : 10,
        search: parsedSearchParams.search ?? undefined,
        sort: parsedSearchParams.sort ?? undefined,
        order: parsedSearchParams.order ?? undefined
    });

    const { isFetching, data } = useQuery({
        queryKey: [table, params],
        queryFn: async () => {
            setSearchParams({
                ...{
                    page: params.page.toString(),
                    limit: params.limit.toString()
                },
                ...(params.search ? { search: params.search } : {}),
                ...(params.sort ? { sort: params.sort } : {}),
                ...(params.order ? { order: params.order } : {})
            });
            const fields: Array<string> = Object.keys(data?.data[0] ?? {});
            const response = await axios.get(`/api/${table}`, {
                params: {
                    ...params,
                    fields
                }
            });
            return response.data as DataObject;
        },
        keepPreviousData: true
    });

    const onPaginationChange: PaginationProps["onChange"] = (page) => {
        setParams((prevState) => ({ ...prevState, page: page - 1 }));
    };

    const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
        _current,
        pageSize
    ) => {
        setParams((prevState) => ({ ...prevState, limit: pageSize, page: 0 }));
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

    return (
        <Wrapper>
            <Controllers
                params={params}
                setParams={setParams}
            />
            <AntTable
                dataSource={data?.data}
                pagination={false}
                rowKey="id"
                loading={isFetching}
                onChange={onTableChange}
                style={styles.table}
                size={isMobile ? "small" : "large"}
            >
                {Object.keys(data?.data[0] ?? {}).map((column) => (
                    <Column
                        title={column
                            .replace(/_/g, " ")
                            .replace(/(^\w)|(\s+\w)/g, (letter) =>
                                letter.toUpperCase()
                            )}
                        dataIndex={column}
                        key={column}
                        showSorterTooltip={false}
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
                    render={({ id }: Data) => (
                        <Link to={`/${table}/${id}`}>
                            <Button
                                shape="circle"
                                icon={<ArrowRightOutlined />}
                            />
                        </Link>
                    )}
                />
            </AntTable>
            <Pagination
                showSizeChanger
                onShowSizeChange={onShowSizeChange}
                pageSize={params.limit}
                current={params.page + 1}
                onChange={onPaginationChange}
                total={data?.count}
                style={
                    isMobile ? styles.paginationCenter : styles.paginationEnd
                }
                simple={isMobile}
            />
        </Wrapper>
    );
};

export default Table;
