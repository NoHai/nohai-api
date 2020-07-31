import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateCommentsTable1596093629882 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            columns: [
                {
                    isPrimary: true,
                    name: 'id',
                    type: 'varchar(36)',
                },
                {
                    name: 'author_id',
                    type: 'varchar(36)',
                },
                {
                    name: 'event_id',
                    type: 'varchar(36)',
                },
                {
                    name: 'description',
                    type: 'varchar(200)',
                },
                {
                    name: 'date',
                    type: 'DATETIME',
                },
                {
                    name: 'isDeleted',
                    type: 'boolean',
                    default: 'false',
                },
            ],
            name: 'comment',
        }), true);

        await queryRunner.createForeignKey('comment', new TableForeignKey({
            columnNames: ['author_id'],
            name: 'FK_comment_users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
        }));

        await queryRunner.createForeignKey('comment', new TableForeignKey({
            columnNames: ['event_id'],
            name: 'FK_comment_events',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            referencedColumnNames: ['id'],
            referencedTableName: 'event',
        }));
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('comment');
    }
}
