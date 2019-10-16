import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterEventTable1571232186534 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.changeColumn('event', 'free_spots', new TableColumn({
            isNullable: true,
            name: 'free_spots',
            type: 'int',
        }));
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.changeColumn('event', 'free_spots', new TableColumn({
            isNullable: false,
            name: 'free_spots',
            type: 'int',
        }));
    }
}
