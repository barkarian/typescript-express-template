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
  @IsNotEmpty()
  email: string;

  @Expose()
  @IsNotEmpty()
  password: string;

}