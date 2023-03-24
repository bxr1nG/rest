import type { TableProps as AntTableProps } from "antd";

import React from "react";
import { Table as AntTable, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import type DataObject from "~/types/DataObject";
import type Data from "~/types/Data";
import Wrapper from "~/components/Wrapper";
import useViewport from "~/hooks/useViewport";
import useParsedSearchParams from "~/hooks/useParsedSearchParams";
import { stringifySearchParams } from "~/utils/SearchParamsParser";
import ColumnTitleParser from "~/utils/ColumnTitleParser";

import Controllers from "./Controllers";
import Pagination from "./Pagination";
import ExpandedRow from "./ExpandedRow";
import { styles } from "./constants";
import { sortOrderParser } from "./helpers";

const { Column } = AntTable;

type TableProps = Record<string, never>;

const Table: React.FC<TableProps> = () => {
    const { params, setParams } = useParsedSearchParams();
    const { isMobile } = useViewport();

    const { table } = useParams() as { table: string };

    const { isFetching, data } = useQuery({
        queryKey: [table, params],
        queryFn: async () => {
            const response = await axios.get(`/api/${table}`, {
                params: stringifySearchParams(params)
            });
            return response.data as DataObject;
        },
        keepPreviousData: true
    });

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
            <Controllers
                params={params}
                setParams={setParams}
            />
            <AntTable
                dataSource={data?.data}
                pagination={false}
                rowKey={Object.keys(data?.data[0] || {})[0]}
                loading={isFetching}
                onChange={onTableChange}
                style={styles.table}
                size={isMobile ? "small" : "middle"}
                expandable={{
                    rowExpandable: (record) =>
                        Object.keys(record).filter(
                            (key) => record[key] === Object(record[key])
                        ).length > 0,
                    expandedRowRender: (render) => (
                        <ExpandedRow render={render} />
                    )
                }}
            >
                {!!data?.data[0] &&
                    Object.keys(data?.data[0])
                        .filter(
                            (key) =>
                                data?.data[0] &&
                                data?.data[0][key] !==
                                    Object(data?.data[0][key])
                        )
                        .map((column, index) => (
                            <Column
                                title={ColumnTitleParser(column)}
                                dataIndex={column}
                                key={column}
                                showSorterTooltip={false}
                                sorter={{
                                    multiple: index
                                }}
                                sortOrder={sortOrderParser(column, params.sort)}
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
                params={params}
                setParams={setParams}
                count={data?.count}
            />
        </Wrapper>
    );
};

export default Table;
