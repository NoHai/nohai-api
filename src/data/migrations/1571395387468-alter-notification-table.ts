import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterNotificationTable1571395387468 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.changeColumn('notification', 'created_date', new TableColumn({
            isNullable: false,
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            name: 'created_date',
        }));
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.changeColumn('notification', 'created_date', new TableColumn({
            isNullable: false,
            name: 'created_date',
            type: 'varchar(36)',
        }));
    }

}
