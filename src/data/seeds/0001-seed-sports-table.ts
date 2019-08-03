import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Sport } from '../../data/entities/sport';

export default class SeedSportTable implements Seeder {
    /* tslint:disable */
    async run(_factory: Factory, connection: Connection): Promise<any> {
        await connection.createQueryBuilder()
            .insert()
            .into(Sport)
            .values([{
                defaultParticipantsNumber: 11,
                description: 'Joc cu mingea intre doua echipe a cate 11 jucatori',
                name: 'Fotbal',
            }])
            .execute();
    }
}
