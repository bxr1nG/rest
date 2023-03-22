import React from "react";
import { Button, Space } from "antd";
import {
    ArrowLeftOutlined,
    HomeOutlined,
    DeleteOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import type Params from "~/types/Params";
import useViewport from "~/hooks/useViewport";

import { styles } from "./constants";

type ControllersProps = {
    setParams: React.Dispatch<React.SetStateAction<Params>>;
};

const Controllers: React.FC<ControllersProps> = (props) => {
    const { setParams } = props;

    const { isMobile } = useViewport();

    const onResetAll = () => {
        setParams((prevState) => ({
            ...prevState,
            range: [prevState.range[0], 0],
            sort: undefined,
            filter: undefined
        }));
    };

    return isMobile ? (
        <Space style={isMobile && styles.mobileSpace}>
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
            <Button onClick={onResetAll}>Reset all</Button>
        </Space>
    );
};

export default Controllers;
