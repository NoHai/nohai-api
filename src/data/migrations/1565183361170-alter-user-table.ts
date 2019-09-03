import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUserTable1565183361170 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.changeColumn('user', 'city_id', new TableColumn({
            isNullable: true,
            name: 'city_id',
            type: 'varchar',
        }));
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.changeColumn('user', 'city_id', new TableColumn({
            isNullable: true,
            name: 'city_id',
            type: 'int',
        }));
    }

}
