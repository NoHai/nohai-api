import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateNotificationTable1566977880472 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            columns: [
                {
                    isPrimary: true,
                    name: 'id',
                    type: 'varchar(36)',
                },
                {
                    name: 'event_id',
                    type: 'varchar(36)',
                },
                {
                    name: 'title',
                    type: 'varchar(200)',
                },
                {
                    name: 'body',
                    type: 'varchar(400)',
                },
                {
                    name: 'type',
                    type: 'int',
                },
                {
                    name: 'avatar_url',
                    type: 'varchar(100)',
                },
                {
                    name: 'created_date',
                    type: 'date',
                },
                {
                    name: 'created_user',
                    type: 'varchar(36)',
                },
            ],
            name: 'notification',
        }), true);

        await queryRunner.createForeignKey('notification', new TableForeignKey({
            columnNames: ['event_id'],
            name: 'FK_notification_event',
            referencedColumnNames: ['id'],
            referencedTableName: 'event',
        }));
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('notification');
    }
}
