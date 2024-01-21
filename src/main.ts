import { MongoDBUserDataSource } from "./data/data-sources/mongodb/mongodb-user-data-source";
import { DatabaseWrapper } from "./data/interfaces/data-sources/database";
import { UserRepositoryImpl } from "./domain/repositories/user-respository";
import { CreateUser } from "./domain/use-cases/user/create-user";
import { GetUserByEmail } from "./domain/use-cases/user/get-user-by-email";
import { UpdateUser } from "./domain/use-cases/user/update-user";
import UserRouter from "./presentation/routers/user-router";
import server from "./server";
import { MongoClient, ServerApiVersion } from "mongodb";

(async () => {
  const uri =
    "mongodb+srv://<user>:<password>@cluster0.hlsunrs.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();
  const db = await client.db("clean-arch");
  const userDatabase: DatabaseWrapper = {
    findOne: (query) => db.collection("user").findOne(query),
    insertOne: (doc) => db.collection("user").insertOne(doc),
    updateOne: (filter, doc) => db.collection("user").updateOne(filter, doc),
  };

  const userMiddleWare = UserRouter(
    new CreateUser(
      new UserRepositoryImpl(new MongoDBUserDataSource(userDatabase))
    ),
    new UpdateUser(
      new UserRepositoryImpl(new MongoDBUserDataSource(userDatabase))
    ),
    new GetUserByEmail(
      new UserRepositoryImpl(new MongoDBUserDataSource(userDatabase))
    )
  );

  server.use("/user", userMiddleWare);
  server.listen(4000, () => console.log("Running on server"));
})();
