import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { WinterSportSeed } from '../seeds/winter-sport.seed';

export class SeedSportTable1572949447072 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        const tableExists = await queryRunner.hasTable('sport');
        if (tableExists) {
            await getRepository('sport').save(WinterSportSeed);
        }
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        const tableExists = await queryRunner.hasTable('sport');
        if (tableExists) {
            await getRepository('sport').delete(WinterSportSeed);
        }
    }

}
