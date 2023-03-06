import { Router } from "express";

import ErrorHandler from "~/middlewares/ErrorHandler";

const router = Router();

router.get("/", (_req, res, next) => {
    try {
        res.status(200).json("Hi!");
    } catch (e) {
        next(e);
    }
});

router.use(ErrorHandler);

export default router;
