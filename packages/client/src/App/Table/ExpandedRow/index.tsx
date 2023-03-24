import React from "react";
import { Table as AntTable, Divider } from "antd";

import type Data from "~/types/Data";
import ColumnTitleParser from "~/utils/ColumnTitleParser";

import { styles } from "./constants";

type ExpandedRowProps = {
    render: Data;
};

const ExpandedRow: React.FC<ExpandedRowProps> = (props) => {
    const { render } = props;
    return (
        <>
            {Object.keys(render)
                .filter((key) => render[key] === Object(render[key]))
                .map((key) => ({
                    name: key,
                    data: (Array.isArray(render[key])
                        ? render[key]
                        : [render[key]]) as Array<Data>
                }))
                .map((table, index) => (
                    <div key={table.name}>
                        <Divider
                            plain
                            orientation="left"
                            style={
                                index === 0 ? styles.firstDivider : undefined
                            }
                        >
                            {table.name}
                        </Divider>
                        <AntTable
                            dataSource={table.data}
                            columns={Object.keys(table.data[0] || {}).map(
                                (column) => ({
                                    key: column,
                                    title: ColumnTitleParser(column),
                                    dataIndex: column
                                })
                            )}
                            style={styles.table}
                            pagination={false}
                            rowKey={Object.keys(table.data[0] || {})[0]}
                            size="small"
                        />
                    </div>
                ))}
        </>
    );
};

export default ExpandedRow;
