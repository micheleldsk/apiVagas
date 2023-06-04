import { User } from "../../../models/user";
import { Vaga } from "../../../models/vaga";
import { VagaRepository } from "../repository";

export interface VagaToCreateDTO {
  descricao: string
  nomeEmpresa: string
  maxCandidatos: number
  dataLimite: string
}

export class CreateVagaUsecase {
  constructor(private repository: VagaRepository) {}

  async execute(vagaToCreate: VagaToCreateDTO, authenticatedUser: User): Promise<Vaga> {
    return this.repository.create({
      ...vagaToCreate,
      recrutadorUuid: authenticatedUser.getUuid(),
    });
  }
}