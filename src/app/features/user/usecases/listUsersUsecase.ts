import { User } from "../../../models/user";
import { UserRepository } from "../repository";

export interface ListUsersFilterDTO {
  tipo: 'candidato' | 'admin' | 'recrutador'
}

export class ListUsersUsecase {
  constructor(private repository: UserRepository) {}

  async execute(filter: ListUsersFilterDTO): Promise<User[]> {
    const users = await this.repository.listUsers(filter);
    return users.map(user => user.toJson());
  }
}