import path from "path";

import express, { Router } from "express";

import config from "~/config";

const router = Router();

router.use(express.static(path.resolve(config.src, "../../client/build/")));

router.get("*", (_req, res) => {
    res.sendFile(path.resolve(config.src, "../../client/build/", "index.html"));
});

export default router;
