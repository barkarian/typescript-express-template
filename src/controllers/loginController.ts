import { Request, Response, NextFunction } from "express";
import { validate, ValidationError } from "class-validator";
import { plainToClass } from "class-transformer";
import { LoginDto } from "@/models/LoginDto";
import { loginService } from "@services/loginService";
import "reflect-metadata";
import mapInputToDto from "@/utis/mapInputToDto";

//Controllers are typically used for validating the DTOs (Check that Application Inputs have the right form)
const loginController = require("express").Router();
export default loginController;
loginController.post("/login",
  async (req: Request, res: Response, next) => {
    try {
      //Get DTOs and validate them
      const propertyId: string = req.params.propertyId;
      //excludeExtraneousValues: is for ignoring input fields from body that are not fields of the model
      //exposeUnsetFields: is for exposing the fields of the generated sendMessageRequest that they don't have value as unidentified
      const sendMessageRequest: LoginDto = await mapInputToDto(LoginDto,req.body);

      //Business Logic (A good practice is to put business logic on "src/services" directory)
      await loginService(sendMessageRequest);

      //Send the response back
      res.json({
        msg: `Param id is: ${propertyId} .`,
        inputData: req.body,
        sendMessageRequest
      });
    } catch (err) {
      next(err);
    }
  });

loginController.get("/sayHelloWorld", async (req, res) => {
  res.json("hello world");
});