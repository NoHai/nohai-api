import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterEventTable1571314614281 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.changeColumn('event', 'description', new TableColumn({
            isNullable: true,
            name: 'description',
            type: 'varchar(2500)',
        }));
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.changeColumn('event', 'description', new TableColumn({
            isNullable: true,
            name: 'description',
            type: 'varchar',
        }));
    }

}
