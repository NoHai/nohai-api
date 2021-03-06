import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCityTable1563016464752 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            columns: [
                {
                    isPrimary: true,
                    name: 'id',
                    type: 'varchar(36)',
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'county_id',
                    type: 'varchar(36)',
                },
            ],
            name: 'city',
        }), true);

    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('city');
    }
}
