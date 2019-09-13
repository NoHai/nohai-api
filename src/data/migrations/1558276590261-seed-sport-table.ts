import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { SportSeed } from '../seeds/sport.seed';

export class SeedSportTable1558276590261 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        const tableExists = await queryRunner.hasTable('sport');
        if (tableExists) {
            await getRepository('sport').save(SportSeed);
        }
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        const tableExists = await queryRunner.hasTable('sport');
        if (tableExists) {
            await getRepository('sport').delete(SportSeed);
        }
    }

}
