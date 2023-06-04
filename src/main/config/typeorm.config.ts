import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { UserEntity } from '../../app/shared/database/entites/user.entity';
import { VagaEntity } from '../../app/shared/database/entites/vaga.entity';
import { CreateUsersTable1684974494369 } from '../../app/shared/database/migrations/1684974494369-CreateUsersTable';
import { CreateVagasTable1685571377631 } from '../../app/shared/database/migrations/1685571377631-CreateVagasTable';

export const config: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  logging: true,
  ssl: { rejectUnauthorized: false },
  schema: 'hiring',
  entities: [UserEntity, VagaEntity],
  migrations: [CreateUsersTable1684974494369, CreateVagasTable1685571377631],
};

export const dataSource = new DataSource(config);