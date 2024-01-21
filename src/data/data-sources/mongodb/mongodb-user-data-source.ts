import { log } from "console";
import { User } from "../../../domain/entities/user";
import { DatabaseWrapper } from "../../interfaces/data-sources/database";
import { UserDataSource } from "../../interfaces/data-sources/user-data-source";

export class MongoDBUserDataSource implements UserDataSource {
  private database: DatabaseWrapper;
  constructor(database: DatabaseWrapper) {
    this.database = database;
  }
  async create(user: User): Promise<User> {
    const result = await this.database.insertOne(user);
    return result;
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.database.findOne({email});
  }
  
  async update(id: string, user: User): Promise<boolean> {
    const result = await this.database.updateOne({ id: id }, user);
    return result !== null;
  }
}
