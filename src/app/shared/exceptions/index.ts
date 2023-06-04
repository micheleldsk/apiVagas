import { Response } from "express";
import { ForbiddenError } from "./forbiddenError";
import { NotFoundError } from "./notFoundError";
import { UnauthorizedError } from "./unauthorizedError";
import { ValidationError } from "./validationError";

export const handleControllerError = (error: any, res: Response) => {
  if (error instanceof ValidationError ||
      error instanceof NotFoundError ||
      error instanceof UnauthorizedError ||
      error instanceof ForbiddenError) {
  return error.respond(res);
}
return res.status(500).send({});
}