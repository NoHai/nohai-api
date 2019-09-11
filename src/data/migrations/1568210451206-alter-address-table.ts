import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterAddressTable1568210451206 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn('address', new TableColumn({
            isNullable: true,
            name: 'longitude',
            type: 'float',
        }));

        await queryRunner.addColumn('address', new TableColumn({
            isNullable: true,
            name: 'latitude',
            type: 'float',
        }));
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('address', 'latitude');
        await queryRunner.dropColumn('address', 'longitude');
    }
}
