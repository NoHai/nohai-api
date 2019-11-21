import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterEventTable1571398159900 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn('event', new TableColumn({
            isNullable: false,
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            name: 'created_date',
        }));
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('event', 'created_date');
    }
}
