import { Request, Response, NextFunction } from "express";
import { validate, ValidationError } from "class-validator";
import { plainToClass } from "class-transformer";

import {
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max,
  IsUUID,
  IsNotEmpty,
  IsPhoneNumber,
  IsOptional
} from "class-validator";
import { Exclude, Expose } from "class-transformer";

export class LoginDto {
  @Expose()
  email: string;

  @Expose()
  @IsNotEmpty()
  password: string;

}