import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AlterEventTable1567428192482 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.renameColumn('event', 'sport', 'sport_id');
        await queryRunner.createForeignKey('event', new TableForeignKey({
            columnNames: ['sport_id'],
            name: 'FK_event_sport',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            referencedColumnNames: ['id'],
            referencedTableName: 'sport',
        }));
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.renameColumn('event', 'sport_id', 'sport');
        const table = await queryRunner.getTable('event');
        const sportForeignKey = table!.foreignKeys.find((fk) => fk.columnNames.indexOf('sport_id') !== -1);
        await queryRunner.dropForeignKey('event', sportForeignKey!);
    }

}
