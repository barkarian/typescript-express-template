import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
export default async function mapInputToDto<Type>(classType, input:Object):Promise<Type>{
  const dto:Type= plainToClass(classType, input, {
    excludeExtraneousValues: true,
    exposeUnsetFields: true
  });
  // @ts-ignore
  const validationErrors: ValidationError[] = await validate(dto, { skipMissingProperties: false });
  if (validationErrors.length !== 0) {
    throw new Error("!!!validationError:" + validationErrors);
  }
  return dto;
}