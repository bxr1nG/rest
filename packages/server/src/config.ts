import process from "process";

import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` });

if (
    !(
        process.env.MY_SQL_HOST &&
        process.env.MY_SQL_USER &&
        process.env.MY_SQL_PASSWORD &&
        process.env.MY_SQL_PORT &&
        process.env.MY_SQL_DATABASE
    )
) {
    throw new Error("Database credentials not provided");
}

const config = {
    isDev: process.env.NODE_ENV === "development",
    port: +(process.env.PORT || 80),
    src: __dirname,
    mySql: {
        host: process.env.MY_SQL_HOST,
        user: process.env.MY_SQL_USER,
        password: process.env.MY_SQL_PASSWORD,
        port: +process.env.MY_SQL_PORT,
        database: process.env.MY_SQL_DATABASE,
        connectionLimit: +(process.env.MY_SQL_CONNECTION_LIMIT || 4)
    }
};

export default config;
