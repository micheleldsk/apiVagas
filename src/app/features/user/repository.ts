import { Repository } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { DatabaseConnection } from "../../../main/database";
import { User } from "../../models/user";
import { UserEntity } from "../../shared/database/entites/user.entity";
import { UserTipo, UserToCreateDTO } from "./usecases/createUserUsecase";

export class UserRepository {
  private userRepository: Repository<UserEntity>;

  constructor() {
    this.userRepository = DatabaseConnection.client.manager.getRepository(UserEntity);
  }

  async create(userToCreate: UserToCreateDTO): Promise<User> {
    const createdUser = await this.userRepository.save({
      uuid: uuidv4(),
      ...userToCreate
    });

    return UserRepository.entityToModel(createdUser);
  }

  async listUsers(filter: Partial<UserEntity>) : Promise<User[]> {
    const usersFound = await this.userRepository.findBy(filter);
    return usersFound.map((userEntity) => UserRepository.entityToModel(userEntity));
  }

  async find(uuid: string) : Promise<User | null> {
    const userFound = await this.userRepository.findOneBy({ uuid });
    return userFound && UserRepository.entityToModel(userFound);
  }

  private static entityToModel(userEntity: UserEntity) {
    return new User(
      userEntity.uuid,
      userEntity.name,
      userEntity.email,
      userEntity.senha,
      userEntity.nomeEmpresa,
      userEntity.tipo as UserTipo,
    );
  }
}