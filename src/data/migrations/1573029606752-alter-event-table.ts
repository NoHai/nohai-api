import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterEventTable1573029606752 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn('event', new TableColumn({
            isNullable: false,
            default: 1,
            type: 'bit',
            name: 'enabled',
        }));
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('event', 'enabled');
    }
}
