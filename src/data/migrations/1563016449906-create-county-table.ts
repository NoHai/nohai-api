import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createCountyTable1563016449906 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            columns: [
                {
                    isPrimary: true,
                    name: 'id',
                    type: 'varbinary(16)',
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
