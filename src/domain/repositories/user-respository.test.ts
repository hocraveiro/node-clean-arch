import { UserDataSource } from "../../data/interfaces/data-sources/user-data-source";
import { User } from "../entities/user";
import { UserRepository } from "../interfaces/repositories/user-repository";
import { UserRepositoryImpl } from "./user-respository";

class MockUserDataSource implements UserDataSource {
  create(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  getUserByEmail(email: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  update(id: string, user: User): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}

describe("User Repository", () => {
  let mockUserDataSource: UserDataSource;
  let userRepository: UserRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUserDataSource = new MockUserDataSource();
    userRepository = new UserRepositoryImpl(mockUserDataSource);
  });

  describe("getUserByEmail", () => {
    test("should return data", async () => {
      const ExpectedData = {
        id: "1",
        name: "John Smith",
        email: "john@gmail.com",
        status: "active",
        createdAt: "2021-01-01T00:00:00.000Z",
        updatedAt: "2021-01-01T00:00:00.000Z",
      };
      jest
        .spyOn(mockUserDataSource, "getUserByEmail")
        .mockImplementation(() => Promise.resolve(ExpectedData));
      const result = await userRepository.getUserByEmail(ExpectedData.email);
      expect(result).toBe(ExpectedData);
    });
  });

  describe("createUser", () => {
    test("should return true", async () => {
      const ExpectedData = {
        id: "1",
        name: "John Smith",
        email: "john@gmail.com",
        status: "active",
        createdAt: "2021-01-01T00:00:00.000Z",
        updatedAt: "2021-01-01T00:00:00.000Z",
      };
      jest
        .spyOn(mockUserDataSource, "create")
        .mockImplementation(() => Promise.resolve(ExpectedData));
      const result = await userRepository.createUser(ExpectedData);
      expect(result).toBe(ExpectedData);
    });
  });
  
    describe("updateUser", () => {
      test("should return true", async () => {
        const ExpectedData = {
          id: "1",
          name: "John Smith",
          email: "john@gmail.com",
          status: "active",
          createdAt: "2021-01-01T00:00:00.000Z",
          updatedAt: "2021-01-01T00:00:00.000Z",
        };
        jest
          .spyOn(mockUserDataSource, "update")
          .mockImplementation(() => Promise.resolve(true));
        const result = await userRepository.update(ExpectedData.id, ExpectedData);
        expect(result).toBe(true);
      });
    });
});
