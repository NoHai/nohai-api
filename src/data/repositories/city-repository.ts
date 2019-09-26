import { ICityRepository } from '../../business/repositories/i-city-repository';
import { City as CityResult } from '../../business/models/results/city';
import { City as CityEntity } from '../entities/city';
import { Observable, from } from 'rxjs';
import { Like } from 'typeorm';
import { map } from 'rxjs/operators';
import { CityFactory } from '../factories/city-factory';

export class CityRepository implements ICityRepository {
    get(parameter: string): Observable<CityResult[]> {
        return from(CityEntity.find({
            name: Like(`%${parameter}%`),
        }))
        .pipe(map((results) => CityFactory.results.fromCityEntities(results)));
    }
}
