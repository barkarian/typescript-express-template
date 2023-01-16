import { User } from "@entities/User";
import { userRepository } from "@/repositories/userRepository";
import { uuid } from "uuidv4";

export const dummyInsert = async () => {
  let user = new User();
  user.email = "email1@gmail.com";
  user.password = "password";
  user.accessToken = uuid();
  let userCreated = await userRepository.save(user);
  user = new User();
  user.email = "email2@gmail.com";
  user.password = "password";
  user.accessToken = uuid();
  userCreated = await userRepository.save(user);
  user = new User();
  user.email = "email3@gmail.com";
  user.password = "password";
  user.accessToken = uuid();
  userCreated = await userRepository.save(user);
  const usersInDb = await userRepository.find();
  console.log({usersInDb});
};