import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCountyTable1563016449906 implements MigrationInterface {

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
            ],
            name: 'county',
        }), true);

    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('county');
    }

}
