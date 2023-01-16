import { LoginDto } from "@/models/LoginDto";
import { findUsersByPropertyIdAndToken } from "@/repositories/userRepository";
import { User } from "@entities/User";
import AppError from "@/middlewares/errors/AppError";

export const loginService = async (loginDto: LoginDto) => {
  try {
    const user: User = await findUsersByPropertyIdAndToken(loginDto.email, loginDto.password);
    //if user doesn't exist throw an error
    if (!user) {
      const error = new AppError(404, "Something went wrong!!!!!");
      throw error;
    }
    return user;
  } catch (error) {
    throw new Error("Something went wrong" + error.message);
  }
};