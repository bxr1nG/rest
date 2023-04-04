import React, { useState } from "react";
import { Button, Popconfirm, Space } from "antd";
import {
    ArrowLeftOutlined,
    HomeOutlined,
    DeleteOutlined,
    FilterOutlined,
    PlusCircleOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import useParsedSearchParams from "~/hooks/useParsedSearchParams";
import useViewport from "~/hooks/useViewport";

import Includes from "./Includes";
import Filters from "./Filters";
import { styles } from "./constants";

type ControllersProps = {
    fields: Array<string> | undefined;
};

const Controllers: React.FC<ControllersProps> = (props) => {
    const { fields } = props;

    const { setParams } = useParsedSearchParams();
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

    const [openFilters, setOpenFilters] = useState(false);

    const showFilters = () => {
        setOpenFilters(true);
    };

    return (
        <>
            {isMobile ? (
                <Space style={styles.mobileSpace}>
                    <Link to="/">
                        <Button
                            type="primary"
                            icon={<HomeOutlined />}
                        />
                    </Link>
                    <Space>
                        <Button
                            onClick={showFilters}
                            icon={<FilterOutlined />}
                        />
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
                        onClick={showFilters}
                        icon={<FilterOutlined />}
                    >
                        Filters
                    </Button>
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
                open={openIncludes}
                setOpen={setOpenIncludes}
            />
            <Filters
                open={openFilters}
                setOpen={setOpenFilters}
                fields={fields}
            />
        </>
    );
};

export default Controllers;
