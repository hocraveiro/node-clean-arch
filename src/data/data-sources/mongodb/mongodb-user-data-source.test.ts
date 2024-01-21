import { DatabaseWrapper } from "../../interfaces/data-sources/database";
import { MongoDBUserDataSource } from "./mongodb-user-data-source";

describe("MongoDB DataSource", () => {
  let mockDatabase: DatabaseWrapper;
  const ExpectedData = {
    id: "1",
    name: "John Smith",
    email: "john@gmail.com",
    status: "active",
    createdAt: "2021-01-01T00:00:00.000Z",
    updatedAt: "2021-01-01T00:00:00.000Z",
  };
  
  beforeAll(async () => {
    mockDatabase = {
      findOne: jest.fn(),
      insertOne: jest.fn(),
      updateOne: jest.fn(),
    };
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getUserByEmail", async () => {
    const ds = new MongoDBUserDataSource(mockDatabase);
    jest
      .spyOn(mockDatabase, "findOne")
      .mockImplementation(() => Promise.resolve(ExpectedData));
    const result = await ds.getUserByEmail(ExpectedData.email);
    expect(mockDatabase.findOne).toHaveBeenCalledWith({email: ExpectedData.email});
    expect(result).toStrictEqual(ExpectedData);
  });

  test("create", async () => {
    const ds = new MongoDBUserDataSource(mockDatabase);
    jest
      .spyOn(mockDatabase, "insertOne")
      .mockImplementation(() => Promise.resolve(ExpectedData));
    const result = await ds.create(ExpectedData);
    expect(mockDatabase.insertOne).toHaveBeenCalledWith(ExpectedData);
    expect(result).toStrictEqual(ExpectedData);
  });
  
   test("update", async () => {
     const ds = new MongoDBUserDataSource(mockDatabase);
    jest
       .spyOn(mockDatabase, "updateOne")
       .mockImplementation(() => Promise.resolve({ update: "123" }));
     const result = await ds.update(ExpectedData.id, ExpectedData);
     expect(mockDatabase.updateOne).toHaveBeenCalledWith({ id: ExpectedData.id }, ExpectedData);
     expect(result).toStrictEqual(true);
   });
});
