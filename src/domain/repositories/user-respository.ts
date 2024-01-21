import { UserDataSource } from "../../data/interfaces/data-sources/user-data-source";
import { User } from "../entities/user";
import { UserRepository } from "../interfaces/repositories/user-repository";

export class UserRepositoryImpl implements UserRepository {
  userDataSource: UserDataSource;
  constructor(userDataSource: UserDataSource) {
    this.userDataSource = userDataSource;
  }

  async createUser(contact: User): Promise<User> {
    const result = await this.userDataSource.create(contact);
    return result;
  }
  async getUserByEmail(email: string): Promise<User> {
    const result = await this.userDataSource.getUserByEmail(email);
    return result;
  }
  async update(id: string, user: User): Promise<boolean> {
    const result = await this.userDataSource.update(id, user);
    return result;
  }
}
