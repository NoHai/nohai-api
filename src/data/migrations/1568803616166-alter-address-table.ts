import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterAddressTable1568803616166 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('address');
        const countyForeignKey = table!.foreignKeys.find((fk) => fk.columnNames.indexOf('county_id') !== -1);
        const cityForeignKey = table!.foreignKeys.find((fk) => fk.columnNames.indexOf('city_id') !== -1);
        await queryRunner.dropForeignKey('address', countyForeignKey!);
        await queryRunner.dropForeignKey('address', cityForeignKey!);

        await queryRunner.changeColumn('address', 'city_id', new TableColumn({
            isNullable: true,
            name: 'city',
            type: 'varchar',
        }));

        await queryRunner.changeColumn('address', 'county_id', new TableColumn({
            isNullable: true,
            name: 'county',
            type: 'varchar',
        }));
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.changeColumn('address', 'city', new TableColumn({
            isNullable: true,
            name: 'city_id',
            type: 'varchar(36)',
        }));

        await queryRunner.changeColumn('address', 'county', new TableColumn({
            isNullable: true,
            name: 'county_id',
            type: 'varchar(36)',
        }));
    }

}
