import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTokensTable1563045221728 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            columns: [
                {
                    isPrimary: true,
                    name: 'user_id',
                    type: 'varchar(36)',
                },
                {
                    isUnique: true,
                    name: 'access_token',
                    type: 'varchar',
                },
                {
                    isUnique: true,
                    name: 'refresh_token',
                    type: 'varchar',
                },
            ],
            name: 'tokens',
        }), true);

        await queryRunner.createForeignKey('tokens', new TableForeignKey({
            columnNames: ['user_id'],
            name: 'FK_tokens_users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
        }));
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('tokens');
    }

}
