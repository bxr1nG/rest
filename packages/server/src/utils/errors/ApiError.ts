import config from "~/config";

class ApiError extends Error {
    statusCode: number;

    constructor(message = "Something went wrong", statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
    }

    build() {
        return {
            success: false,
            status: this.statusCode,
            message: this.message,
            stack: config.isDev ? this.stack : {}
        };
    }
}

export default ApiError;
