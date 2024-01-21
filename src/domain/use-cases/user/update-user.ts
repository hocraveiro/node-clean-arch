import { User } from "../../entities/user";
import { UserRepository } from "../../interfaces/repositories/user-repository";
import { UpdateUserUseCase } from "../../interfaces/use-cases/user/update-user";

export class UpdateUser implements UpdateUserUseCase {
  userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(id: string, user: User): Promise<boolean> {
    const result = await this.userRepository.update(id, user);
    return result;
  }
}
