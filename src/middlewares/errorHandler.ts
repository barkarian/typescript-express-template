import express, {NextFunction, Request, Response} from "express";
import AppError from "@/middlewares/errors/AppError";
import {ErrorResponse} from "@/middlewares/errors/ErrorResponse";


// Middleware function for logging the request method and request URL
const requestLogger = (
    request: Request,
    response: Response,
    next: NextFunction) => {

    console.log(`${request.method} url:: ${request.url}`);
    next();
};

export const errorLogger = (
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction) => {
    console.log(`error ${error.message}`);
    next(error); // calling next middleware
};

export const errorResponder = (
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction) => {
    response.header("Content-Type", "application/json");
    //Custom error response
    if (error instanceof AppError) {
        const errorResponse: ErrorResponse = {
            error: {
                message: error.message,
                code: error.code,
                details: error.details
            }
        }
        return response.status(error.statusCode).send(errorResponse);
    }
    //Non-custom error response (An Error that is Not an AppError)
    const nonCustomErrorResponse: ErrorResponse = {
        error: {
            message: error.message,
            code: "NON_CUSTOM_ERROR",
            details: []
        }
    }
    response.status(500).send(nonCustomErrorResponse);
};

// Fallback Middleware function for returning
// 404 error for undefined paths
export const invalidPathHandler = (
    request: Request,
    response: Response,
    next: NextFunction) => {
    response.status(404);
    response.send("invalid path");
};