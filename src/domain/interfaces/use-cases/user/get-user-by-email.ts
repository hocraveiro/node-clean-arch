import { User } from "../../../entities/user";

export interface GetUserByEmailUseCase {
  execute(email: string): Promise<User>;
}
