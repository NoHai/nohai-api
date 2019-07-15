import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUserTable1563019507518 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn('user', new TableColumn({
            isUnique: true,
            name: 'login',
            type: 'varchar(256)',
        }));

        await queryRunner.addColumn('user', new TableColumn({
            isUnique: true,
            name: 'password',
            type: 'varchar(256)',
        }));
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('user', 'login');
        await queryRunner.dropColumn('user', 'password');
    }

}
