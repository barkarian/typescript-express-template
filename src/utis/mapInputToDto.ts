import {plainToClass} from "class-transformer";
import {validate, ValidationError} from "class-validator";
import ValidationCustomError from "@/middlewares/errors/ValidationCustomError";

export default async function mapInputToDto<Type>(classType, input: Object): Promise<Type> {
    const dtoObject: Type = plainToClass(classType, input, {
        excludeExtraneousValues: true,
        exposeUnsetFields: true
    });
    // @ts-ignore
    const validationErrors: ValidationError[] = await validate(dtoObject, {skipMissingProperties: false});
    if (validationErrors.length !== 0) {
        throw new ValidationCustomError("Validation error occurred while trying to create a DTO of type:" + classType.type, validationErrors);
    }
    return dtoObject;
}