import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUserTable1563023766916 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.changeColumn('user', 'first_name', new TableColumn({
            isNullable: true,
            name: 'first_name',
            type: 'varchar',
        }));

        await queryRunner.changeColumn('user', 'last_name', new TableColumn({
            isNullable: true,
            name: 'last_name',
            type: 'varchar',
        }));

        await queryRunner.changeColumn('user', 'date_of_birth', new TableColumn({
            isNullable: true,
            name: 'date_of_birth',
            type: 'date',
        }));

        await queryRunner.changeColumn('user', 'height', new TableColumn({
            isNullable: true,
            name: 'height',
            type: 'int',
        }));

        await queryRunner.changeColumn('user', 'weight', new TableColumn({
            isNullable: true,
            name: 'weight',
            type: 'int',
        }));

        await queryRunner.changeColumn('user', 'picture', new TableColumn({
            isNullable: true,
            name: 'picture',
            type: 'varchar',
        }));

        await queryRunner.changeColumn('user', 'city_id', new TableColumn({
            isNullable: true,
            name: 'city_id',
            type: 'int',
        }));
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.changeColumn('user', 'first_name', new TableColumn({
            isNullable: false,
            name: 'first_name',
            type: 'varchar',
        }));

        await queryRunner.changeColumn('user', 'last_name', new TableColumn({
            isNullable: false,
            name: 'last_name',
            type: 'varchar',
        }));

        await queryRunner.changeColumn('user', 'date_of_birth', new TableColumn({
            isNullable: false,
            name: 'dat_of_birth',
            type: 'date',
        }));

        await queryRunner.changeColumn('user', 'height', new TableColumn({
            isNullable: false,
            name: 'height',
            type: 'int',
        }));

        await queryRunner.changeColumn('user', 'weight', new TableColumn({
            isNullable: false,
            name: 'weight',
            type: 'int',
        }));

        await queryRunner.changeColumn('user', 'picture', new TableColumn({
            isNullable: false,
            name: 'picture',
            type: 'varchar',
        }));

        await queryRunner.changeColumn('user', 'city_id', new TableColumn({
            isNullable: false,
            name: 'city_id',
            type: 'int',
        }));
    }

}
