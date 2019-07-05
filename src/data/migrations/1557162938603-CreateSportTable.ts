import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSportTable1557162938603 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'sport',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
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
        }), true);

    }

    async down(queryRunner: QueryRunner): Promise<any> {
        queryRunner.dropTable('sport');
    }

}
