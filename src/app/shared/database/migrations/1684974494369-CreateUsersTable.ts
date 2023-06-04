import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm"

export class CreateUsersTable1684974494369 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          new TableColumn({ name: 'user_uuid', type: 'varchar', isPrimary: true }),
          new TableColumn({ name: 'user_name', type: 'varchar' }),
          new TableColumn({ name: 'user_email', type: 'varchar' }),
          new TableColumn({ name: 'user_senha', type: 'varchar' }),
          new TableColumn({ name: 'user_nome_empresa', type: 'varchar', isNullable: true }),
          new TableColumn({ name: 'user_tipo', type: 'varchar' }),
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
