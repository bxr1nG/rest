import type { PaginationProps, TableProps as AntTableProps } from "antd";

import React, { useState } from "react";
import { Table as AntTable, Pagination, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams, Link } from "react-router-dom";
import axios from "axios";

import type DataObject from "~/types/DataObject";
import type Data from "~/types/Data";
import type Params from "~/types/Params";
import type Include from "~/types/Include";
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
        range: searchParams.get("range"),
        sort: searchParams.get("sort"),
        filter: searchParams.get("filter"),
        include: searchParams.get("include"),
        includeMany: searchParams.get("includeMany")
    };
    const [params, setParams] = useState<Params>({
        range: parsedSearchParams.range
            ? (JSON.parse(parsedSearchParams.range) as [number, number])
            : [10, 0],
        sort: parsedSearchParams.sort
            ? (JSON.parse(parsedSearchParams.sort) as Array<
                  [string, "asc" | "desc"]
              >)
            : undefined,
        filter: parsedSearchParams.filter
            ? (JSON.parse(parsedSearchParams.filter) as Array<
                  [string, (string | number | Date)[]]
              >)
            : undefined,
        include: parsedSearchParams.include
            ? (JSON.parse(parsedSearchParams.include) as Array<Include>)
            : undefined,
        includeMany: parsedSearchParams.includeMany
            ? (JSON.parse(parsedSearchParams.includeMany) as Array<Include>)
            : undefined
    });

    const { isFetching, data } = useQuery({
        queryKey: [table, params],
        queryFn: async () => {
            const newSearchParams = {
                ...{
                    range: JSON.stringify(params.range)
                },
                ...(params.sort ? { sort: JSON.stringify(params.sort) } : {}),
                ...(params.filter
                    ? { filter: JSON.stringify(params.filter) }
                    : {}),
                ...(params.include
                    ? { include: JSON.stringify(params.include) }
                    : {}),
                ...(params.includeMany
                    ? { includeMany: JSON.stringify(params.includeMany) }
                    : {})
            };
            setSearchParams(newSearchParams);
            const fields: Array<string> = Object.keys(data?.data[0] ?? {});
            const response = await axios.get(`/api/${table}`, {
                params: {
                    ...newSearchParams,
                    fields
                }
            });
            return response.data as DataObject;
        },
        keepPreviousData: true
    });

    const onPaginationChange: PaginationProps["onChange"] = (page) => {
        setParams((prevState) => ({
            ...prevState,
            range: [prevState.range[0], prevState.range[0] * (page - 1)]
        }));
    };

    const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
        _current,
        pageSize
    ) => {
        setParams((prevState) => ({ ...prevState, range: [pageSize, 0] }));
    };

    const onTableChange: AntTableProps<Data>["onChange"] = (
        _pagination,
        _filters,
        sorter
    ) => {
        setParams((prevState) => ({
            ...prevState,
            sort: Array.isArray(sorter)
                ? sorter.map((sort) => [
                      sort.field as keyof Data,
                      sort.order === "ascend" ? "asc" : "desc"
                  ])
                : sorter.order
                ? [
                      [
                          sorter.field as keyof Data,
                          sorter.order === "ascend" ? "asc" : "desc"
                      ]
                  ]
                : undefined,
            range: [prevState.range[0], 0]
        }));
    };

    return (
        <Wrapper>
            <Controllers setParams={setParams} />
            <AntTable
                dataSource={data?.data}
                pagination={false}
                rowKey={Object.keys(data?.data[0] || { id: 0 })[0]}
                loading={isFetching}
                onChange={onTableChange}
                style={styles.table}
                size={isMobile ? "small" : "large"}
            >
                {Object.keys(data?.data[0] ?? {}).map((column, index) => (
                    <Column
                        title={column
                            .replace(/_/g, " ")
                            .replace(/(^\w)|(\s+\w)/g, (letter) =>
                                letter.toUpperCase()
                            )}
                        dataIndex={column}
                        key={column}
                        showSorterTooltip={false}
                        sorter={{
                            multiple: index + 1
                        }}
                        sortOrder={
                            params.sort
                                ? params.sort.filter(
                                      (sort) => sort[0] === column
                                  ).length
                                    ? (
                                          params.sort.filter(
                                              (sort) => sort[0] === column
                                          )[0] as [string, "asc" | "desc"]
                                      )[1] === "asc"
                                        ? "ascend"
                                        : "descend"
                                    : undefined
                                : undefined
                        }
                    />
                ))}
                <Column
                    render={(data: Data) => (
                        <Link
                            to={`/${table}/${
                                data[Object.keys(data)[0] as string] as string
                            }${
                                Object.keys(data)[0] === "id"
                                    ? ""
                                    : `/${Object.keys(data)[0] as string}`
                            }`}
                        >
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
                pageSize={params.range[0]}
                current={params.range[1] / params.range[0] + 1}
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
