import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEventTable1556985848812 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            columns: [
                {
                    isPrimary: true,
                    name: 'id',
                    type: 'varbinary(16)',
                },
                {
                    name: 'title',
                    type: 'varchar',
                },
                {
                    name: 'description',
                    type: 'varchar',
                },
                {
                    name: 'location',
                    type: 'varchar',
                },
                {
                    name: 'sport',
                    type: 'varchar',
                },
                {
                    name: 'participants_number',
                    type: 'int',
                },
                {
                    name: 'cost',
                    type: 'decimal(9,2)',
                },
            ],
            name: `event`,
        }), true);
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('event', true, true);
    }

}
