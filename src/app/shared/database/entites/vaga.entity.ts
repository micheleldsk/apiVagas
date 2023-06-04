import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'vagas' })
export class VagaEntity {
  @PrimaryColumn({ name: 'vaga_uuid' })
  uuid!: string
  
  @Column({ name: 'vaga_recrutador_uuid' })
  recrutadorUuid!: string
  
  @Column({ name: 'vaga_descricao' })
  descricao!: string
  
  @Column({ name: 'vaga_nome_empresa' })
  nomeEmpresa!: string

  @Column({ name: 'vaga_data_limite' })
  dataLimite!: string

  @Column({ name: 'vaga_ativo' })  
  ativo!: boolean

  @Column({ name: 'vaga_max_candidatos' })
  maxCandidatos?: number
}
