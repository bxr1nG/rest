import React, { useState } from "react";
import { Input, Button, Space } from "antd";
import {
    ArrowLeftOutlined,
    HomeOutlined,
    DeleteOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import type Params from "~/types/Params";
import useViewport from "~/hooks/useViewport";

import { styles } from "./constants";

const { Search } = Input;

type ControllersProps = {
    params: Params;
    setParams: React.Dispatch<React.SetStateAction<Params>>;
};

const Controllers: React.FC<ControllersProps> = (props) => {
    const { params, setParams } = props;

    const { isMobile } = useViewport();

    const [searchValue, setSearchValue] = useState<string | undefined>();

    const onSearch = (value: string) => {
        setParams((prevState) => ({ ...prevState, search: value, page: 0 }));
    };

    const onResetAll = () => {
        setParams((prevState) => ({
            ...prevState,
            page: 0,
            search: undefined,
            order: undefined,
            sort: undefined
        }));
        setSearchValue("");
    };

    return isMobile ? (
        <>
            <Space style={styles.mobileSpace}>
                <Link to="/">
                    <Button
                        type="primary"
                        icon={<HomeOutlined />}
                    />
                </Link>
                <Button
                    onClick={onResetAll}
                    icon={<DeleteOutlined />}
                />
            </Space>
            <Search
                placeholder="Search"
                defaultValue={params.search}
                allowClear
                onSearch={onSearch}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
        </>
    ) : (
        <Space>
            <Link to="/">
                <Button
                    type="primary"
                    icon={<ArrowLeftOutlined />}
                >
                    Home
                </Button>
            </Link>
            <Search
                placeholder="Search"
                defaultValue={params.search}
                allowClear
                onSearch={onSearch}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button onClick={onResetAll}>Reset all</Button>
        </Space>
    );
};

export default Controllers;
