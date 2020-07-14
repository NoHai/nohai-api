import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AlterUserTable1574348786507 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('user', 'first_name');
        await queryRunner.dropColumn('user', 'last_name');
        await queryRunner.dropColumn('user', 'height');
        await queryRunner.dropColumn('user', 'weight');
        await queryRunner.dropColumn('user', 'picture');
        await queryRunner.dropColumn('user', 'city');
        await queryRunner.dropColumn('user', 'favorite_sport');
        await queryRunner.dropColumn('user', 'date_of_birth');

        await queryRunner.addColumn('user', new TableColumn({
            isNullable: true,
            name: 'details_id',
            type: 'varchar',

        }));

        await queryRunner.addColumn('user', new TableColumn({
            isNullable: false,
            name: 'created_date',
            default: 'CURRENT_TIMESTAMP',
            type: 'datetime',
        }));

        await queryRunner.addColumn('user', new TableColumn({
            isNullable: true,
            name: 'modified_date',
            default: 'CURRENT_TIMESTAMP',
            type: 'datetime',
        }));

        await queryRunner.createForeignKey('user', new TableForeignKey({
            columnNames: ['details_id'],
            name: 'FK_user_user_details',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            referencedColumnNames: ['id'],
            referencedTableName: 'user_details',
        }));
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('user', 'details_id');
        await queryRunner.dropColumn('user', 'created_date');
        await queryRunner.dropColumn('user', 'modified_date');
    }
}
