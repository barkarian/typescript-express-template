import {relationalDataSource} from "@config/dataSources";
import {User} from "@entities/User";

export const userRepository = relationalDataSource.getRepository(User);

export const findUsersByPropertyIdAndToken = async (email: string, password: string) => {
    const userFilter = new User();
    userFilter.email = email;
    userFilter.password = password;
    const user = await userRepository.findOneBy(userFilter);
    return user;
};
