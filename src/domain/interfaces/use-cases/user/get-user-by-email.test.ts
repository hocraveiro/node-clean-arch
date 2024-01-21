import { User } from "../../../entities/user";
import { GetUserByEmail } from "../../../use-cases/user/get-user-by-email";
import { UserRepository } from "../../repositories/user-repository";

describe("Get User By Email Use Case", () => {
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

  test("should return data", async () => {
    const ExpectedResult = {
      id: "1",
      name: "John Smith",
      email: "john@gmail.com",
      status: "active",
      createdAt: "2021-01-01T00:00:00.000Z",
      updatedAt: "2021-01-01T00:00:00.000Z",
    };

    jest
      .spyOn(mockUserRepository, "getUserByEmail")
      .mockImplementation(() => Promise.resolve(ExpectedResult));
    const getUserByEmailUse = new GetUserByEmail(mockUserRepository);
    const result = await getUserByEmailUse.execute('john@gmail.com');
    expect(result).toStrictEqual(ExpectedResult);
  });
});
