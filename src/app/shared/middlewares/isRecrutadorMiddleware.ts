import { NextFunction, Request, Response } from "express";
import { handleControllerError } from "../exceptions";
import { ForbiddenError } from "../exceptions/forbiddenError";
import { UnauthorizedError } from "../exceptions/unauthorizedError";

export const isRecrutadorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authenticatedUser } = req.body;
    console.log(authenticatedUser)
    if (!authenticatedUser) throw new UnauthorizedError('Usuário não autenticado');
    if (!authenticatedUser.isRecrutador()) throw new ForbiddenError('Somente recrutadores podem criar vagas');

    next(); 
  } catch (error) {
    console.log(error);
    handleControllerError(error, res);
  }
}
