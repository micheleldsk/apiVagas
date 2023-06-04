import { User } from "../../../models/user";
import { UserRepository } from "../repository";

export class FindUserUsecase {
  constructor(private repository: UserRepository) {}

  async execute(uuid: string): Promise<User | null> {
    const user = await this.repository.find(uuid);
    return user && user.toJson();
  }
}