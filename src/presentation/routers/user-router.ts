import express, { Request, Response } from "express";
import { CreateUserUseCase } from "../../domain/interfaces/use-cases/user/create-user";
import { UpdateUserUseCase } from "../../domain/interfaces/use-cases/user/update-user";
import { GetUserByEmailUseCase } from "../../domain/interfaces/use-cases/user/get-user-by-email";

export default function UserRouter(
  createUserUseCase: CreateUserUseCase,
  updateUserUseCase: UpdateUserUseCase,
  getUserByEmailUseCase: GetUserByEmailUseCase,
) {
  const router = express.Router();

  router.get("/:email", async (req: Request, res: Response) => {
    try {
      const user = await getUserByEmailUseCase.execute(req.params.email);
      res.send(user);
    } catch (err) {
      res.status(500).send({ message: "Error fetching data" });
    }
  });

  router.post("/", async (req: Request, res: Response) => {
    try {
      const user = await createUserUseCase.execute(req.body);
      res.statusCode = 201;
      res.json({ message: "Created" });
    } catch (err) {
      res.status(500).send({ message: "Error saving data" });
    }
  });
  
  router.put("/:id", async (req: Request, res: Response) => {
    try {
      await updateUserUseCase.execute(req.params.id, req.body);
      res.statusCode = 204;
      res.json({ message: "Updated" });
    } catch (err) {
      res.status(500).send({ message: "Error updating data" });
    }
  });

  return router;
}
