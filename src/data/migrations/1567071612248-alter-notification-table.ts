import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterNotificationTable1567071612248 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn('notification', new TableColumn({
            name: 'status',
            type: 'int',
        }));

        await queryRunner.addColumn('notification', new TableColumn({
            name: 'user_id',
            type: 'varchar(36)',
        }));
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('notification', 'status');
        await queryRunner.dropColumn('notification', 'user_id');
    }

}
