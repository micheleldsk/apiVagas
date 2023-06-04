import { Response } from "express";

export class ForbiddenError extends Error {
  constructor(errorMessage: string) {
    super(errorMessage);
  }

  respond(res: Response) {
    return res.status(403).send({ message: this.message });
  } 
}