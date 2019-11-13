import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterEventTable1573115890594 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.changeColumn('event', 'enabled', new TableColumn({
            isNullable: false,
            default: 1,
            type: 'tinyint',
            name: 'status',
        }));
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.changeColumn('event', 'status', new TableColumn({
            isNullable: false,
            default: 1,
            type: 'bit',
            name: 'enabled',
        }));
    }

}
