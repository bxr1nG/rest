import { Router } from "express";

import type Params from "~/types/Params";
import ErrorHandler from "~/middlewares/ErrorHandler";
import Base from "~/utils/strategies/ORM/Base";

import controllers from "./controllers";

const router = Router();

router
    .get("/tables", (_req, res, next) => {
        Base.getTables()
            .then((result) => res.status(200).json(result))
            .catch((error) => next(error));
    })
    .get("/columns/:table", (req, res, next) => {
        Base.getTableColumns(req.params.table)
            .then((result) => res.status(200).json(result))
            .catch((error) => next(error));
    })
    .get("/table/:table", (req, res, next) => {
        controllers
            .getAll(req.params.table, req.query as Params)
            .then((result) => res.status(200).json(result))
            .catch((error) => next(error));
    })
    .get("/table/:table/:id/:idColumn?", (req, res, next) => {
        controllers
            .getById(
                req.params.table,
                req.params.id,
                req.params.idColumn || "id"
            )
            .then((result) => res.status(200).json(result))
            .catch((error) => next(error));
    });

router.use(ErrorHandler);

export default router;
