import { Response } from "express";

export class NotFoundError extends Error {
  constructor(errorMessage: string) {
    super(errorMessage);
  }

  respond(res: Response) {
    return res.status(404).send({ message: this.message });
  } 
}