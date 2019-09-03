import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterNotificationTable1567415927126 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.renameColumn('notification', 'type', 'notification_type');
    }

    async down(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.renameColumn('notification', 'notification_type', 'type');
    }
}

