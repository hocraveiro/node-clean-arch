import { User } from "../../../entities/user";

export interface UpdateUserUseCase {
  execute(id: string, user: User): Promise<boolean>;
}
