import process from "process";

import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` });

const config = {
    isDev: process.env.NODE_ENV === "development",
    port: +(process.env.PORT || 80),
    src: __dirname
};

export default config;
