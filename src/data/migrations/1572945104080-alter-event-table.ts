import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterEventTable1572945104080 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.changeColumn('event', 'start_date', new TableColumn({
            isNullable: true,
            type: 'date',
            name: 'start_date',
        }));

        await queryRunner.changeColumn('event', 'end_date', new TableColumn({
            isNullable: true,
            type: 'date',
            name: 'end_date',
        }));
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.changeColumn('event', 'start_date', new TableColumn({
            isNullable: true,
            type: 'varchar(30)',
            name: 'start_date',
        }));

        await queryRunner.changeColumn('event', 'end_date', new TableColumn({
            isNullable: true,
            type: 'varchar(30)',
            name: 'end_date',
        }));
    }
}
