import { Router } from "express";

import ErrorHandler from "~/middlewares/ErrorHandler";

import player from "./player/routes";

const router = Router();

router.use("/player", player);

router.use(ErrorHandler);

export default router;
