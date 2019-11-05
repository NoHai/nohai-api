import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUserTable1572947991641 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn('user', new TableColumn({
            isNullable: false,
            default: 0,
            type: 'bit',
            name: 'enabled',
        }));
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('user', 'enabled');
    }

}
