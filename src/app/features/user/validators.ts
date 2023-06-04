import { ValidationError } from "../../shared/exceptions/validationError";

export const validateCreateUser = (params: any) => {
  const { name, email, senha, tipo, nomeEmpresa } = params;

  if (typeof name !== 'string') throw Error('Nome inválido');
  if (typeof email !== 'string') throw Error('Email inválido');
  if (typeof senha !== 'string') throw Error('Senha inválido');
  if (tipo !== 'candidato' &&
      tipo !== 'admin' &&
      tipo !== 'recrutador')
    throw Error('Tipo inválido');
  // if (typeof nomeEmpresa !== 'string') throw Error('Nome empresa inválido');

  return { name, email, senha, tipo, nomeEmpresa };
}

export const validateUsersFilter = (params: any) => {
  const { tipo } = params;

  if (tipo !== 'candidato' &&
      tipo !== 'admin' &&
      tipo !== 'recrutador' &&
      tipo !== undefined)
    throw new ValidationError('Tipo inválido');

  return { tipo };
}
