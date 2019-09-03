import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateUserEventsTable1567509323578 implements MigrationInterface {

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
                    name: 'event_id',
                    type: 'varchar(36)',
                },
                {
                    name: 'status',
                    type: 'int',
                },
            ],
            name: 'user_events',
        }), true);

        await queryRunner.createForeignKey('user_events', new TableForeignKey({
            columnNames: ['user_id'],
            name: 'FK_user_events_user',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
        }));

        await queryRunner.createForeignKey('user_events', new TableForeignKey({
            columnNames: ['event_id'],
            name: 'FK_user_events_event',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            referencedColumnNames: ['id'],
            referencedTableName: 'event',
        }));
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('user_events');
    }

}
