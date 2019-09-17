import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUserTable1568624792438 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn('user', new TableColumn({
            isNullable: true,
            name: 'favorite_sport',
            type: 'varchar(36)',
        }));

        await queryRunner.changeColumn('user', 'date_of_birth', new TableColumn({
            isNullable: true,
            name: 'date_of_birth',
            type: 'varchar(20)',
        }));

    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('user', 'favorite_sport');

        await queryRunner.changeColumn('user', 'date_of_birth', new TableColumn({
            isNullable: true,
            name: 'date_of_birth',
            type: 'date',
        }));
    }

}
