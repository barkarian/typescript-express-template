class AppError extends Error {
    code: string;
    details: any[];
    statusCode: number;


    constructor(message: string, code: string, details: any[], statusCode: number) {
        super(message);
        Object.setPrototypeOf(this, AppError.prototype);
        this.name = Error.name;
        this.code = code;
        this.details = details;
        this.statusCode = statusCode;
        Error.captureStackTrace(this);
    }
}

export default AppError;