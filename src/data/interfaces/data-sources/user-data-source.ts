import { User } from "../../../domain/entities/user";

export interface UserDataSource {
  create(user: User): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
  update(id: string, user: User): Promise<boolean>;
}
