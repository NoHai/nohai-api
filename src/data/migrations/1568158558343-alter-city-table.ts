import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AlterCityTable1568158558343 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('city');
        const foreignKey = table!.foreignKeys.find((fk) => fk.columnNames.indexOf('county_id') !== -1);
        await queryRunner.dropForeignKey('city', foreignKey!);

        await queryRunner.changeColumn('city', 'county_id', new TableColumn({
            isNullable: true,
            name: 'county_id',
            type: 'varchar(36)',
        }));

        const countyFk = new TableForeignKey({
            columnNames: ['county_id'],
            onDelete: 'CASCADE',
            referencedColumnNames: ['id'],
            referencedTableName: 'county',
        });
        await queryRunner.createForeignKey('city', countyFk);
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.changeColumn('city', 'county_id', new TableColumn({
            isNullable: false,
            name: 'county_id',
            type: 'varchar(36)',
        }));
    }

}
