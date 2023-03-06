import ApiError from "./ApiError";

class NotFoundError extends ApiError {
    constructor() {
        super("Not Found");
        this.statusCode = 404;
    }
}

export default NotFoundError;
