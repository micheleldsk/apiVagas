import { Response } from "express";

export class ValidationError extends Error {
  constructor(errorMessage: string) {
    super(errorMessage);
  }

  respond(res: Response) {
    return res.status(400).send({ message: this.message });
  } 
}