import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUserTable1565272499468 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.changeColumn('user', 'password', new TableColumn({
            isUnique: false,
            name: 'password',
            type: 'varchar',
        }));
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.changeColumn('user', 'password', new TableColumn({
            isUnique: true,
            name: 'password',
            type: 'varchar',
        }));
    }
}
