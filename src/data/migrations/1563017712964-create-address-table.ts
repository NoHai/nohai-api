import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAddressTable1563017712964 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            columns: [
                {
                    isPrimary: true,
                    name: 'id',
                    type: 'varchar(36)',
                },
                {
                    name: 'street_name',
                    type: 'varchar',
                },
                {
                    name: 'city_id',
                    type: 'varchar(36)',
                },
                {
                    name: 'county_id',
                    type: 'varchar(36)',
                },
            ],
            name: 'address',
        }), true);

    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('address');
    }
}
