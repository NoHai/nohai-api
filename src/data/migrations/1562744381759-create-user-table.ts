import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1562744381759 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            columns: [
                {
                    isPrimary: true,
                    name: 'id',
                    type: 'varchar(36)',
                },
                {
                    name: 'first_name',
                    type: 'varchar',
                },
                {
                    name: 'last_name',
                    type: 'varchar',
                },
                {
                    name: 'date_of_birth',
                    type: 'date',
                },
                {
                    name: 'height',
                    type: 'int',
                },
                {
                    name: 'weight',
                    type: 'int',
                },
                {
                    name: 'picture',
                    type: 'varchar',
                },
                {
                    name: 'city_id',
                    type: 'int',
                },
            ],
            name: 'user',
        }), true);
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('user');
    }
}
