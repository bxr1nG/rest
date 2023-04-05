import express, { json } from "express";
import cors from "cors";

import config from "./config";
import apiRouter from "./routes/api/routes";
import clientRouter from "./routes/client.router";
import swaggerDocs from "./utils/swagger";

const app = express();

app.use(json());
app.use(cors());

swaggerDocs(app);

app.use("/api", apiRouter);
app.use("/", clientRouter);

const server = app.listen(config.port, () => {
    console.info(`Server started at port ${config.port}`);
    console.info(`API: http://localhost:${config.port}/api/`);
    console.info(`API docs: http://localhost:${config.port}/api-docs/`);
    console.info(`UI: http://localhost:${config.port}/`);
});

const startGracefulShutdown = () => {
    console.info("Received kill signal, shutting down gracefully");
    server.close(() => {
        console.info("Closed out remaining connections");
    });
};

process.on("SIGTERM", startGracefulShutdown);
process.on("SIGINT", startGracefulShutdown);
