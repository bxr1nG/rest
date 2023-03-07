import { Router } from "express";

import type PlayerGetAllParams from "~/types/PlayerGetAllParams";

import controllers from "./controllers";

const router = Router();

router
    .get("/", (req, res, next) => {
        controllers
            .getAll(req.query as PlayerGetAllParams)
            .then((result) => res.status(200).json(result))
            .catch((error) => next(error));
    })
    .get("/:id", (req, res, next) => {
        controllers
            .getById(+req.params.id)
            .then((result) => res.status(200).json(result))
            .catch((error) => next(error));
    });

export default router;
