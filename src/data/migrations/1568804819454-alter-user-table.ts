import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUserTable1568804819454 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.changeColumn('user', 'city_id', new TableColumn({
            isNullable: true,
            name: 'city',
            type: 'varchar',
        }));
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.changeColumn('user', 'city', new TableColumn({
            isNullable: true,
            name: 'city_id',
            type: 'varchar(36)',
        }));
    }
}
