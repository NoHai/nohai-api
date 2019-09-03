import { IUserEventsRepository } from '../../business/repositories/i-user-events-repository';
import { UserEventsInput } from '../../business/models/inputs/user-events-input';
import { UserEvents as UserEventsResult } from '../../business/models/results/user-events';
import { Observable, of, from } from 'rxjs';
import { UserEventsFactory } from '../factories/user-events-factory';
import { switchMap, map } from 'rxjs/operators';
import { UserEvents } from '../entities/user-events';

export class UserEventsRepository implements IUserEventsRepository {
    insert(input: UserEventsInput): Observable<UserEventsResult> {
        return of(UserEventsFactory.entity.fromUserEventsInput(input))
        .pipe(switchMap((entity) => entity.save()))
        .pipe(map((entity) => UserEventsFactory.result.fromUserEventsEntity(entity)));
    }

    delete(id: string): Observable<number | undefined> {
        return  from(UserEvents.delete(id))
        .pipe(map((res) => res.affected));
    }
}
