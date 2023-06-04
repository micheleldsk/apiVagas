import { ValidationError } from "../../shared/exceptions/validationError";

export const validateCreateVaga = (params: any) => {
  const { descricao, nomeEmpresa, maxCandidatos, dataLimite } = params;

  if (typeof descricao !== 'string') throw new ValidationError('Descrição inválida');
  if (typeof nomeEmpresa !== 'string') throw new ValidationError('Nome da empresa inválida');
  if (typeof maxCandidatos !== 'number') throw new ValidationError('Maximo de candidatos inválido');
  if (typeof dataLimite !== 'string') throw new ValidationError('Data limite inválida');

  return { descricao, nomeEmpresa, maxCandidatos, dataLimite };
}
