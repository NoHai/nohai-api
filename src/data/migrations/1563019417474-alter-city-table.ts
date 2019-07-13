import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class alterCityTable1563019417474 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        
        const foreignKey = new TableForeignKey({
                columnNames: ['county_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'county',
                onDelete: 'CASCADE',

        });

        await queryRunner.createForeignKey('city', foreignKey);
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('city');
        const foreignKey = table!.foreignKeys.find((fk) => fk.columnNames.indexOf('county_id') !== -1);
        await queryRunner.dropForeignKey('city', foreignKey!);
    }
}
