import { ICountyRepository } from '../../business/repositories/i-county-repository';
import { Observable, from } from 'rxjs';
import { County as CountyResult } from '../../business/models/results/county';
import { County as CountyEntity } from '../entities/county';
import { Like } from 'typeorm';
import { map } from 'rxjs/operators';
import { CountyFactory } from '../factories/county-factory';

export class CountyRepository implements ICountyRepository {
    get(parameter: string): Observable<CountyResult[]> {
        return from(CountyEntity.find({
            name: Like(`%${parameter}%`),
        }))
        .pipe(map((results) => CountyFactory.results.fromCountyEntities(results)));
    }
}
