import type { Express, Request, Response } from "express";

import fs from "fs";
import path from "path";

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const { version } = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../../../../package.json"), "utf8")
) as { version: string };

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Abstract REST ORM",
            version
        }
    },
    apis: [path.resolve(__dirname, "../routes/api/routes.*")]
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app: Express) {
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    app.get("/api-docs.json", (_req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
}

export default swaggerDocs;
