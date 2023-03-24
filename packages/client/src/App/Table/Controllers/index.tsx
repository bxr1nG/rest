import React, { useState } from "react";
import { Button, Popconfirm, Space } from "antd";
import {
    ArrowLeftOutlined,
    HomeOutlined,
    DeleteOutlined,
    PlusCircleOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import type Params from "~/types/Params";
import useViewport from "~/hooks/useViewport";

import { styles } from "./constants";
import Includes from "./Includes";

type ControllersProps = {
    params: Params;
    setParams: React.Dispatch<React.SetStateAction<Params>>;
};

const Controllers: React.FC<ControllersProps> = (props) => {
    const { params, setParams } = props;

    const { isMobile } = useViewport();

    const onResetAll = () => {
        setParams((prevState) => ({
            ...prevState,
            range: [prevState.range[0], 0],
            sort: undefined,
            filter: undefined,
            include: undefined,
            includeMany: undefined
        }));
    };

    const [openIncludes, setOpenIncludes] = useState(false);

    const showIncludes = () => {
        setOpenIncludes(true);
    };

    return (
        <>
            {isMobile ? (
                <Space style={isMobile && styles.mobileSpace}>
                    <Link to="/">
                        <Button
                            type="primary"
                            icon={<HomeOutlined />}
                        />
                    </Link>
                    <Space>
                        <Button
                            onClick={showIncludes}
                            icon={<PlusCircleOutlined />}
                        />
                        <Popconfirm
                            title="Are you sure to reset all settings?"
                            description="Reset all settings"
                            onConfirm={onResetAll}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button icon={<DeleteOutlined />} />
                        </Popconfirm>
                    </Space>
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
                    <Button
                        onClick={showIncludes}
                        icon={<PlusCircleOutlined />}
                    >
                        Includes
                    </Button>
                    <Popconfirm
                        title="Are you sure to reset all settings?"
                        description="Reset all settings"
                        onConfirm={onResetAll}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button>Reset all</Button>
                    </Popconfirm>
                </Space>
            )}
            <Includes
                params={params}
                setParams={setParams}
                open={openIncludes}
                setOpen={setOpenIncludes}
            />
        </>
    );
};

export default Controllers;
