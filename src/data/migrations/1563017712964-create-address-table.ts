import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAddressTable1563017712964 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            columns: [
                {
                    isPrimary: true,
                    name: 'id',
                    type: 'varbinary(16)',
                },
                {
                    name: 'street_name',
                    type: 'varchar',
                },
                {
                    name: 'city_id',
                    type: 'varbinary(16)',
                },
                {
                    name: 'county_id',
                    type: 'varbinary(16)',
                },
            ],
            name: 'address',
        }), true);

    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('address');
    }
}
