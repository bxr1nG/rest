import type { PaginationProps as AntPaginationProps } from "antd";

import React from "react";
import { Pagination as AntPagination } from "antd";

import type Params from "~/types/Params";
import useViewport from "~/hooks/useViewport";

import { styles } from "./constants";

type PaginationProps = {
    params: Params;
    setParams: React.Dispatch<React.SetStateAction<Params>>;
    count: number | undefined;
};

const Pagination: React.FC<PaginationProps> = (props) => {
    const { params, setParams, count } = props;

    const { isMobile } = useViewport();

    const onPaginationChange: AntPaginationProps["onChange"] = (page) => {
        setParams((prevState) => ({
            ...prevState,
            range: [prevState.range[0], prevState.range[0] * (page - 1)]
        }));
    };

    const onShowSizeChange: AntPaginationProps["onShowSizeChange"] = (
        _current,
        pageSize
    ) => {
        setParams((prevState) => ({ ...prevState, range: [pageSize, 0] }));
    };

    return (
        <AntPagination
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
            pageSize={params.range[0]}
            current={params.range[1] / params.range[0] + 1}
            onChange={onPaginationChange}
            total={count}
            style={isMobile ? styles.paginationCenter : styles.paginationEnd}
            simple={isMobile}
        />
    );
};

export default Pagination;
