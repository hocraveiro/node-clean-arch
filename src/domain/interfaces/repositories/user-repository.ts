import { User } from "../../entities/user";

export interface UserRepository {
  createUser(user: User): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
  update(id: string, user: User): Promise<boolean>;  
}
