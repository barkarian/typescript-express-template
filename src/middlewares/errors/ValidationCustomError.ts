import AppError from "./AppError";

export default class ValidationCustomError extends AppError {
    constructor(message: string, details: any[]) {
        super(message, "VALIDATION_ERROR", details, 404);
    }
}