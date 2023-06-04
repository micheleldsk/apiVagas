import { User } from "../../../models/user";
import { ForbiddenError } from "../../../shared/exceptions/forbiddenError";
import { UserRepository } from "../repository";

export type UserTipo = 'candidato' | 'admin' | 'recrutador';

export interface UserToCreateDTO {
  name: string
  email: string
  senha: string
  nomeEmpresa?: string
  tipo: UserTipo
}

export class CreateUserUsecase {
  constructor(private repository: UserRepository) {}

  async execute(userToCreate: UserToCreateDTO, authenticatedUser: User): Promise<User> {
    if (userToCreate.tipo === 'recrutador' && !authenticatedUser.isAdmin() ) {
      throw new ForbiddenError('Only admin can create recrutador');
    }
    return this.repository.create(userToCreate);
  }
}