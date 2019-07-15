import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AlterCityTable1563019417474 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {

        const foreignKey = new TableForeignKey({
                columnNames: ['county_id'],
                onDelete: 'CASCADE',
                referencedColumnNames: ['id'],
                referencedTableName: 'county',
        });

        await queryRunner.createForeignKey('city', foreignKey);
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('city');
        const foreignKey = table!.foreignKeys.find((fk) => fk.columnNames.indexOf('county_id') !== -1);
        await queryRunner.dropForeignKey('city', foreignKey!);
    }
}
