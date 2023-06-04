import { Response } from "express";

export class UnauthorizedError extends Error {
  constructor(errorMessage: string) {
    super(errorMessage);
  }

  respond(res: Response) {
    return res.status(401).send({ message: this.message });
  } 
}