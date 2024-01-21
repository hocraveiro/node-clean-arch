import { log } from "console";
import { User } from "../../entities/user";
import { UserRepository } from "../../interfaces/repositories/user-repository";
import { GetUserByEmailUseCase } from "../../interfaces/use-cases/user/get-user-by-email";

export class GetUserByEmail implements GetUserByEmailUseCase {
  userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(email: string): Promise<User> {
    const result = await this.userRepository.getUserByEmail(email);
    return result;
  }
}
