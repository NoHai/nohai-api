import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUserTable1568123718194 implements MigrationInterface {

     async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn('user', new TableColumn({
            isNullable: true,
            name: 'login_with_fb',
            type: 'tinyint(1)',
        }));
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('user', 'login_with_fb');
    }

}
