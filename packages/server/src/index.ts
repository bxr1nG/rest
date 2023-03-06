import express, { json } from "express";
import cors from "cors";

import config from "./config";
import apiRouter from "./routes/api";
import clientRouter from "./routes/client.router";

const app = express();

app.use(json());
app.use(cors());

app.use("/api", apiRouter);
app.use("/", clientRouter);

const server = app.listen(config.port, () => {
    console.info(`Server started at port ${config.port}`);
});

const startGracefulShutdown = () => {
    console.info("Received kill signal, shutting down gracefully");
    server.close(() => {
        console.info("Closed out remaining connections");
    });
};

process.on("SIGTERM", startGracefulShutdown);
process.on("SIGINT", startGracefulShutdown);
