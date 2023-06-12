import { Repository } from "typeorm";
import { v4 } from 'uuid';
import { DatabaseConnection } from "../../../main/database";
import { Vaga } from "../../models/vaga";
import { VagaEntity } from "../../shared/database/entites/vaga.entity";

export class VagaRepository {
  private vagaRepository: Repository<VagaEntity>;

  constructor() {
    this.vagaRepository = DatabaseConnection.client.manager.getRepository(VagaEntity);
  }

  listAllVagas() : Promise<VagaEntity[]> {
    return this.vagaRepository.find();
  }

  async create(vagaToCreate: Partial<VagaEntity>) : Promise<Vaga> {
    const vagaCreated = await this.vagaRepository.save({
      uuid: v4(),
      ...vagaToCreate,
    });
    return VagaRepository.entityToModel(vagaCreated);
  }

  private static entityToModel(vagaEntity: VagaEntity) {
    return new Vaga(
      vagaEntity.uuid,
      vagaEntity.descricao,
      vagaEntity.nomeEmpresa,
      vagaEntity.ativo,
      vagaEntity.dataLimite,
      vagaEntity.recrutadorUuid,
      vagaEntity.maxCandidatos,
    );
  }
}