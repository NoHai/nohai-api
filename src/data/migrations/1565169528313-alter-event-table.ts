import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AlterEventTable1565169528313 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.addColumn('event', new TableColumn({
            isNullable: true,
            name: 'level',
            type: 'int',
        }));

        await queryRunner.renameColumn('event', 'participants_number', 'free_spots');
        await queryRunner.changeColumn('event', 'location', new TableColumn({
            isNullable: true,
            name: 'address_id',
            type: 'varchar',
        }));

        await queryRunner.changeColumn('event', 'description', new TableColumn({
            isNullable: true,
            name: 'description',
            type: 'varchar',
        }));

        const addressForeignKey = new TableForeignKey({
            columnNames: ['address_id'],
            onDelete: 'CASCADE',
            referencedColumnNames: ['id'],
            referencedTableName: 'address',

        });

        await queryRunner.createForeignKey('event', addressForeignKey);
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.renameColumn('event', 'free_spots', 'participants_number');

        const table = await queryRunner.getTable('event');
        const addressForeignKey = table!.foreignKeys.find((fk) => fk.columnNames.indexOf('address_id') !== -1);
        await queryRunner.dropForeignKey('event', addressForeignKey!);
    }

}
