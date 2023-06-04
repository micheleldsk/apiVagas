import { User } from "../../models/user";
import { UserRepository } from "../user/repository";

export interface LoginDataDTO {
  email: string
  senha: string
}

export class LoginUsecase {
  constructor(private repository: UserRepository) {}

  async execute(loginData: LoginDataDTO): Promise<User | null> {
    const usersFound = await this.repository.listUsers(loginData);
    return usersFound.length > 0
      ? usersFound[0].toJson()
      : null;
  }
}