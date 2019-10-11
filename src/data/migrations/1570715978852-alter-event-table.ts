import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterEventTable1570715978852 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.changeColumn('event', 'date', new TableColumn({
            isNullable: true,
            name: 'start_date',
            type: 'varchar(30)',
        }));

        await queryRunner.addColumn('event', new TableColumn({
            isNullable: true,
            name: 'end_date',
            type: 'varchar(30)',
        }));

        await queryRunner.changeColumn('event', 'hour', new TableColumn({
            isNullable: true,
            name: 'start_time',
            type: 'varchar(30)',
        }));

        await queryRunner.changeColumn('event', 'duration', new TableColumn({
            isNullable: true,
            name: 'end_time',
            type: 'varchar(30)',
        }));
    }

    async down(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.changeColumn('event', 'start_date', new TableColumn({
            isNullable: true,
            name: 'date',
            type: 'varchar',
        }));

        await queryRunner.dropColumn('event', 'end_date');

        await queryRunner.changeColumn('event', 'start_time', new TableColumn({
            isNullable: true,
            name: 'hour',
            type: 'varchar(30)',
        }));

        await queryRunner.changeColumn('event', 'end_time', new TableColumn({
            isNullable: true,
            name: 'duration',
            type: 'int',
        }));
    }
}
