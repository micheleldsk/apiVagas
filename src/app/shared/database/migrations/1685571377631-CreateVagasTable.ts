import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class CreateVagasTable1685571377631 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vagas',
        columns: [
          new TableColumn({ name: 'vaga_uuid', type: 'varchar', isPrimary: true }),
          new TableColumn({ name: 'vaga_recrutador_uuid', type: 'varchar' }),
          new TableColumn({ name: 'vaga_descricao', type: 'varchar' }),
          new TableColumn({ name: 'vaga_nome_empresa', type: 'varchar' }),
          new TableColumn({ name: 'vaga_data_limite', type: 'timestamp' }),
          new TableColumn({ name: 'vaga_ativo', type: 'boolean', default: true }),
          new TableColumn({ name: 'vaga_max_candidatos', type: 'int', isNullable: true }),
        ],
        foreignKeys: [
          {
            columnNames: ['vaga_recrutador_uuid'],
            referencedTableName: 'users',
            referencedColumnNames: ['user_uuid']
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('vagas');
  }
}
