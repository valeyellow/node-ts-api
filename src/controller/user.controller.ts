import { Request, Response } from "express";
import { createUser } from "../service/user.service";

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    return user;
  } catch (e: any) {
    res.status(409).send(e.message); // 409 --> Conflict (user already exists)
  }
}
