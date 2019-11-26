import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateFavoriteSportsTable1574676102947 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            columns: [
                {
                    isPrimary: true,
                    name: 'id',
                    type: 'varchar(36)',
                },
                {
                    isNullable: false,
                    name: 'sport_id',
                    type: 'varchar(36)',
                },
                {
                    isNullable: false,
                    name: 'user_id',
                    type: 'varchar(36)',
                },
                {
                    isNullable: false,
                    name: 'created_date',
                    type: 'datetime',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
            name: 'user_sports',
        }), true);

        await queryRunner.createForeignKey('user_sports', new TableForeignKey({
            columnNames: ['user_id'],
            name: 'FK_user_sports_user',
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
        }));

        await queryRunner.createForeignKey('user_sports', new TableForeignKey({
            columnNames: ['sport_id'],
            name: 'FK_user_sports_sport',
            referencedColumnNames: ['id'],
            referencedTableName: 'sport',
        }));
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('user_sports');
    }
}
