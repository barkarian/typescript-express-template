export type ErrorResponse = {
    error: {
        message: string;
        code: string;
        details: any[];
    }
}