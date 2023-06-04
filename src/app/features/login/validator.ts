import { ValidationError } from "../../shared/exceptions/validationError";

export const validateLoginData = (params: any) => {
  const { email, senha } = params;

  if (typeof email !== 'string') throw new ValidationError('Email não enviado');
  if (typeof senha !== 'string') throw new ValidationError('Senha não enviada');

  return { email, senha };
}