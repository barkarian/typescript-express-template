import {LoginDto} from "@/models/LoginDto";
import {findUsersByPropertyIdAndToken} from "@/repositories/userRepository";
import {User} from "@entities/User";
import AppError from "@/middlewares/errors/AppError";

export const loginService = async (loginDto: LoginDto) => {
    let user: User;
    try {
        user = await findUsersByPropertyIdAndToken(loginDto.email, loginDto.password);
    } catch (error) {
        throw error;
    }
    //if user doesn't exist throw an error
    if (!user) {
        const error = new AppError("User:" + loginDto.email + " email or password are wrong", "CONFIG_NOT_FOUND", [], 404);
        throw error;
    }
    return user;
};