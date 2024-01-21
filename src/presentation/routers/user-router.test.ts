import request from "supertest";
import server from "../../../src/server";
import UserRouter from "./user-router";
import { User } from "../../domain/entities/user";
import { CreateUserUseCase } from "../../domain/interfaces/use-cases/user/create-user";
import { UpdateUserUseCase } from "../../domain/interfaces/use-cases/user/update-user";
import { GetUserByEmailUseCase } from "../../domain/interfaces/use-cases/user/get-user-by-email";
import { create } from "domain";

class MockCreateUserUseCase implements CreateUserUseCase {
  execute(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
}

class MockUpdateUserUseCase implements UpdateUserUseCase {
  execute(id: string, user: User): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}

class MockGetUserByEmailUseCase implements GetUserByEmailUseCase {
  execute(email: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
}

describe("User Router", () => {
  let mockCreateUserUseCase: MockCreateUserUseCase;
  let mockUpdateUserUseCase: MockUpdateUserUseCase;
  let mockGetUserByEmailUseCase: MockGetUserByEmailUseCase;

  beforeAll(() => {
    mockCreateUserUseCase = new MockCreateUserUseCase();
    mockUpdateUserUseCase = new MockUpdateUserUseCase();
    mockGetUserByEmailUseCase = new MockGetUserByEmailUseCase();
    server.use(
      "/user",
      UserRouter(
        mockCreateUserUseCase,
        mockUpdateUserUseCase,
        mockGetUserByEmailUseCase
      )
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /user/john@gmail.com", () => {
    test("should return 200 with data", async () => {
      const ExpectedData = {
        id: "1",
        name: "John Smith",
        email: "john@gmail.com",
        status: "active",
        createdAt: "2021-01-01T00:00:00.000Z",
        updatedAt: "2021-01-01T00:00:00.000Z",
      };
      jest
        .spyOn(mockGetUserByEmailUseCase, "execute")
        .mockImplementation(() => Promise.resolve(ExpectedData));

      const response = await request(server).get("/user/john@gmail.com");

      expect(response.status).toBe(200);
      expect(mockGetUserByEmailUseCase.execute).toBeCalledTimes(1);
      expect(response.body).toStrictEqual(ExpectedData);
    });

    test("GET /user/john@gmail.com returns 500 on use case error", async () => {
      jest
        .spyOn(mockGetUserByEmailUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));
      const response = await request(server).get("/user/john@gmail.com");
      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual({ message: "Error fetching data" });
    });
  });

  describe("POST /user", () => {
    test("POST /user", async () => {
      const InputData = {
        id: "1",
        name: "John Smith",
        email: "john@gmail.com",
        status: "active",
        createdAt: "2021-01-01T00:00:00.000Z",
        updatedAt: "2021-01-01T00:00:00.000Z",
      };
      jest
        .spyOn(mockCreateUserUseCase, "execute")
        .mockImplementation(() => Promise.resolve(InputData));
      const response = await request(server).post("/user").send(InputData);
      expect(response.status).toBe(201);
    });

    test("POST /contact returns 500 on use case error", async () => {
      const InputData = {
        id: "1",
        name: "John Smith",
        email: "john@gmail.com",
        status: "active",
        createdAt: "2021-01-01T00:00:00.000Z",
        updatedAt: "2021-01-01T00:00:00.000Z",
      };
      jest
        .spyOn(mockCreateUserUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));
      const response = await request(server).post("/user").send(InputData);
      expect(response.status).toBe(500);
    });
  });
  
    describe("PUT /user/:id", () => {
      test("PUT /user/:id with success", async () => {
        const InputData = {
          id: "1",
          name: "John Smith",
          email: "john@gmail.com",
          status: "active",
          createdAt: "2021-01-01T00:00:00.000Z",
          updatedAt: "2021-01-01T00:00:00.000Z",
        };
        jest
          .spyOn(mockUpdateUserUseCase, "execute")
          .mockImplementationOnce(() => Promise.resolve(true));
        const response = await request(server).put("/user/1").send(InputData);
        expect(response.status).toBe(204);
      });

      test("PUT /user/:id returns 500 on use case error", async () => {
        const InputData = {
          id: "1",
          name: "John Smith",
          email: "john@gmail.com",
          status: "active",
          createdAt: "2021-01-01T00:00:00.000Z",
          updatedAt: "2021-01-01T00:00:00.000Z",
        };
        jest
          .spyOn(mockUpdateUserUseCase, "execute")
          .mockImplementationOnce(() => Promise.reject(Error()));
        const response = await request(server).put("/user/1").send(InputData);
        expect(response.status).toBe(500);
      });
    });
});
