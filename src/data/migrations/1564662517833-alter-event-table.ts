import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterEventTable1564662517833 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn('event', new TableColumn({
            isNullable: false,
            name: 'owner',
            type: 'varchar(256)',
        }));

        await queryRunner.addColumn('event', new TableColumn({
            isNullable: false,
            name: 'date',
            type: 'varchar(256)',
        }));

        await queryRunner.addColumn('event', new TableColumn({
            isNullable: false,
            name: 'hour',
            type: 'varchar(256)',
        }));

        await queryRunner.addColumn('event', new TableColumn({
            isNullable: true,
            name: 'duration',
            type: 'int',
        }));
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('event', 'owner');
        await queryRunner.dropColumn('event', 'date');
        await queryRunner.dropColumn('event', 'hour');
        await queryRunner.dropColumn('event', 'duration');
    }
}
