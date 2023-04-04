import { AxiosError } from "axios";

const onQueryError = (
    err: unknown,
    openError: (message: string, description?: string) => void
) => {
    if (err instanceof AxiosError) {
        const data = err.response?.data as {
            message: string;
            status: number;
        };
        openError(`${data.status} ${data.message}`);
    } else {
        openError("Unknown error");
    }
};

export default onQueryError;
