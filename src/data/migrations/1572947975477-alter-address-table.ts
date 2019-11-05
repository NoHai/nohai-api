import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterAddressTable1572947975477 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.changeColumn('address', 'longitude', new TableColumn({
            isNullable: true,
            type: 'float',
            name: 'longitude',
        }));

        await queryRunner.changeColumn('address', 'latitude', new TableColumn({
            isNullable: true,
            type: 'float',
            name: 'latitude',
        }));
    }

    async down(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.changeColumn('address', 'longitude', new TableColumn({
            isNullable: false,
            type: 'float',
            name: 'longitude',
        }));

        await queryRunner.changeColumn('address', 'latitude', new TableColumn({
            isNullable: false,
            type: 'float',
            name: 'latitude',
        }));
    }

}
