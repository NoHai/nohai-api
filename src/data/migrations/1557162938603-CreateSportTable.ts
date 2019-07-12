import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSportTable1557162938603 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            columns: [
                {
                    isPrimary: true,
                    name: 'id',
                    type: 'binary(16)',
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'description',
                    type: 'varchar',
                },
                {
                    name: 'default_participants_number',
                    type: 'int',
                },
            ],
            name: 'sport',
        }), true);

    }

    async down(queryRunner: QueryRunner): Promise<any> {
        queryRunner.dropTable('sport');
    }
}
