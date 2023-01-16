import {Request, Response, NextFunction} from "express";
import {validate, ValidationError} from "class-validator";
import {plainToClass} from "class-transformer";
import {LoginDto} from "@/models/LoginDto";
import {loginService} from "@services/loginService";
import "reflect-metadata";
import mapInputToDto from "@/utis/mapInputToDto";

//Controllers are typically used for validating the DTOs (Check that Application Inputs have the right form)
const simpleController = require("express").Router();
export default simpleController;
simpleController.post("/login",
    async (req: Request, res: Response, next) => {
        try {
            //Get DTOs and validate them
            const propertyId: string = req.params.propertyId;
            //excludeExtraneousValues: is for ignoring input fields from body that are not fields of the model
            //exposeUnsetFields: is for exposing the fields of the generated sendMessageRequest that they don't have value as unidentified
            const sendMessageRequest: LoginDto = await mapInputToDto(LoginDto, req.body);

            //Business Logic (A good practice is to put business logic on "src/services" directory)
            await loginService(sendMessageRequest);

            //Send the response back
            res.json({
                msg: `Param id is: ${propertyId} .`,
                inputData: req.body,
                sendMessageRequest
            });
        } catch (err) {
            //On Controller level error it is not thrown
            //error is passed to the next middlewares
            //(errorHandling and logging)
            next(err);
        }
    });

simpleController.get("/sayHelloWorld", async (req, res) => {
    res.json("hello world");
});

simpleController.get("/nonCustomError", async (req: Request, res: Response, next: NextFunction) => {
    try {
        throw new Error("A non custom error for example NULL pointer exception +stack trace")
        res.json("Unreachable code - response will never be arrived");
    } catch (error) {
        //Check how a non-custom Error would return to you
        next(error)
    }
});