import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AlterAddressTable1563022789039 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        const countyForeignKey = new TableForeignKey({
            columnNames: ['county_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'county',
            onDelete: 'CASCADE',

        });
        const cityForeignKey = new TableForeignKey({
            columnNames: ['city_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'city',
            onDelete: 'CASCADE',

        });

        await queryRunner.createForeignKey('address', countyForeignKey);
        await queryRunner.createForeignKey('address', cityForeignKey);
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('address');
        const countyForeignKey = table!.foreignKeys.find((fk) => fk.columnNames.indexOf('county_id') !== -1);
        const cityForeignKey = table!.foreignKeys.find((fk) => fk.columnNames.indexOf('city_id') !== -1);
        await queryRunner.dropForeignKey('address', countyForeignKey!);
        await queryRunner.dropForeignKey('address', cityForeignKey!);
    }
}
