import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateNotificationTokenTable1566291583011 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            columns: [
                {
                    isPrimary: true,
                    name: 'id',
                    type: 'varchar(36)',
                },
                {
                    name: 'user_id',
                    type: 'varchar(36)',
                },
                {
                    name: 'token',
                    type: 'varchar(200)',
                },
            ],
            name: 'notification_token',
        }), true);

        await queryRunner.createForeignKey('notification_token', new TableForeignKey({
            columnNames: ['user_id'],
            name: 'FK_notification_token_users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
        }));
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('notification_token');
    }
}
