import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { User } from "../../models/user";
import { UnauthorizedError } from "../exceptions/unauthorizedError";
import { ValidationError } from "../exceptions/validationError";
import { NotFoundError } from "../exceptions/notFoundError";

export const authenticatedMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwtToken = req.headers.authorization;
    if (!jwtToken) throw new UnauthorizedError('JWT não enviado');
    const decoded = jwt.verify(jwtToken, process.env.MY_SECRET_KEY_JWT as string);

    if (typeof decoded !== 'object') throw new Error('Decoded JWT formatted wrongly');
    if (typeof decoded.uuid !== 'string') throw new Error('Decoded JWT formatted wrongly');
    if (typeof decoded.name !== 'string') throw new Error('Decoded JWT formatted wrongly');
    if (typeof decoded.email !== 'string') throw new Error('Decoded JWT formatted wrongly');
    if (decoded.tipo !== 'candidato' &&
        decoded.tipo !== 'admin' &&
        decoded.tipo !== 'recrutador') throw new Error('Decoded JWT formatted wrongly');


    req.body.authenticatedUser = new User(
      decoded.uuid,
      decoded.name,
      decoded.email,
      undefined,
      decoded.nomeEmpresa,
      decoded.tipo,
    );
    next();
  } catch (error) {
    if (error instanceof ValidationError ||
        error instanceof NotFoundError ||
        error instanceof UnauthorizedError) {
      return error.respond(res);
    }
    console.log(error);
    return res.status(500).send({});
  }
}