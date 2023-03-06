import type { NextFunction, Request, Response } from "express";

import ApiError from "~/utils/errors/ApiError";
import config from "~/config";

const ErrorHandler = (
    err: ApiError | Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    if (!(err instanceof ApiError)) {
        const apiErr = new ApiError(config.isDev ? err.message : undefined);
        res.status(apiErr.statusCode).send(apiErr.build());
    } else {
        res.status(err.statusCode).json(err.build());
    }
};

export default ErrorHandler;
