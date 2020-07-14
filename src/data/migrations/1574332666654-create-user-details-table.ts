import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateUserDetailsTable1574332666654 implements MigrationInterface {

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
                    name: 'user_id',
                    type: 'varchar(36)',
                },
                {
                    isNullable: true,
                    name: 'first_name',
                    type: 'varchar',
                },
                {
                    isNullable: true,
                    name: 'last_name',
                    type: 'varchar',
                },
                {
                    isNullable: true,
                    name: 'city',
                    type: 'varchar',
                },
                {
                    isNullable: true,
                    name: 'picture',
                    type: 'varchar',
                },
                {
                    isNullable: true,
                    name: 'date_of_birth',
                    type: 'date',
                },
                {
                    isNullable: true,
                    name: 'job_title',
                    type: 'varchar',
                },
                {
                    isNullable: true,
                    name: 'web_page',
                    type: 'varchar',
                },
                {
                    isNullable: true,
                    name: 'facebook_page',
                    type: 'varchar',
                },
                {
                    isNullable: true,
                    name: 'description',
                    type: 'varchar',
                },
                {
                    isNullable: false,
                    name: 'created_date',
                    default: 'CURRENT_TIMESTAMP',
                    type: 'datetime',
                },
                {
                    isNullable: true,
                    name: 'modified_date',
                    default: 'CURRENT_TIMESTAMP',
                    type: 'datetime',
                },
            ],
            name: 'user_details',
        }), true);

        await queryRunner.createForeignKey('user_details', new TableForeignKey({
            columnNames: ['user_id'],
            name: 'FK_user_details_user',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
        }));

    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('user_details');
    }
}
