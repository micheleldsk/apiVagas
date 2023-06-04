import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryColumn({ name: 'user_uuid' })
  uuid?: string
  
  @Column({ name: 'user_name' })
  name?: string
  
  @Column({ name: 'user_email' })
  email?: string
  
  @Column({ name: 'user_senha' })
  senha?: string

  @Column({ name: 'user_nome_empresa' })
  nomeEmpresa?: string

  @Column({ name: 'user_tipo' })  
  tipo?: string
}
