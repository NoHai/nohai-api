import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { CountySeed } from '../seeds/county.seed';
import { County } from '../entities/county';
import { CitySeed } from '../seeds/city.seed';
import { City } from '../entities/city';

export class SeedCityTable1568297538498 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        const countyExists = await queryRunner.hasTable('county');
        if (countyExists) {
            await getRepository('county').save(CountySeed);
            await getRepository('city').save(CitySeed);
            const sibiuCounty = await County.findOneOrFail({ name: 'Sibiu' });
            queryRunner.connection.createQueryBuilder()
                .update(City)
                .set({ countyId: sibiuCounty.id })
                .execute();
        }
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        const tableExists = await queryRunner.hasTable('county');
        if (tableExists) {
            await getRepository('county').delete(CountySeed);
            await getRepository('city').delete(CitySeed);
        }
    }

}
