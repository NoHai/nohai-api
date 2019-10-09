import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Sport as SportResult } from '../../business/models/results/sport';
import { ISportRepository } from '../../business/repositories/i-sport-repository';
import { Sport } from '../entities/sport';
import { SportFactory } from '../factories/sport-factory';

export class SportRepository implements ISportRepository {
    getAll(): Observable<SportResult> {
        return from(Sport.find({ order: { name: 'ASC' }}))
            .pipe(switchMap((entities) => from(entities)))
            .pipe(map((foundEntity) => SportFactory.result.fromSportEntity(foundEntity)));
    }
}
