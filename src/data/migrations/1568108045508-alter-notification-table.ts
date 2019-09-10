import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterNotificationTable1568108045508 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.changeColumn('notification', 'created_date',  new TableColumn({
            isNullable: false,
            name: 'created_date',
            type: 'varchar(36)',
        }));
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.changeColumn('notification', 'created_date',  new TableColumn({
            isNullable: false,
            name: 'created_date',
            type: 'date',
        }));
    }
}
