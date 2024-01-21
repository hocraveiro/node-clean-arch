import { User } from "../../../entities/user";
import { UpdateUser } from "../../../use-cases/user/update-user";
import { UserRepository } from "../../repositories/user-repository";

describe("Update User Use Case", () => {
  class MockUserRepository implements UserRepository {
    createUser(user: User): Promise<User> {
      throw new Error("Method not implemented.");
    }
    getUserByEmail(email: string): Promise<User> {
      throw new Error("Method not implemented.");
    }
    update(id: string, user: User): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
  }
  let mockUserRepository: UserRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUserRepository = new MockUserRepository();
  });

  test("should return true", async () => {
    const ExpectedResult = {
      id: "1",
      name: "John Smith",
      email: "john@gmail.com",
      status: "active",
      createdAt: "2021-01-01T00:00:00.000Z",
      updatedAt: "2021-01-01T00:00:00.000Z",
    };

    jest
      .spyOn(mockUserRepository, "update")
      .mockImplementation(() => Promise.resolve(true));
    const updateUserUseCase = new UpdateUser(mockUserRepository);
    const result = await updateUserUseCase.execute(ExpectedResult.id, ExpectedResult);
    expect(result).toStrictEqual(true);
  });
});
