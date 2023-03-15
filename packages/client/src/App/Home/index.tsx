import React, { useState } from "react";
import { Button, Input, InputNumber, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import Wrapper from "~/components/Wrapper";

import { styles } from "./constants";

const { Compact } = Space;

type HomeProps = Record<string, never>;

const Home: React.FC<HomeProps> = () => {
    const navigate = useNavigate();

    const [table, setTable] = useState("");
    const [id, setId] = useState<string | null>(null);

    const onClick = () => {
        navigate(id ? `/${table}/${id}` : `/${table}`);
    };

    return (
        <Wrapper center>
            <Compact>
                <Input
                    placeholder="table"
                    value={table}
                    onChange={(e) => setTable(e.target.value)}
                    style={styles.input}
                />
                <InputNumber
                    placeholder="id"
                    value={id}
                    onChange={(value) => setId(value)}
                    style={styles.inputNumber}
                />
                <Button
                    disabled={table === ""}
                    type="primary"
                    icon={<SearchOutlined />}
                    onClick={onClick}
                />
            </Compact>
        </Wrapper>
    );
};

export default Home;
