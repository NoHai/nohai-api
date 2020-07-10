import { IUserEventsRepository } from '../../business/repositories/i-user-events-repository';
import { UserEventsInput } from '../../business/models/inputs/user-events-input';
import { UserEvents as UserEventsResult } from '../../business/models/results/user-events';
import { Observable, of, from } from 'rxjs';
import { UserEventsFactory } from '../factories/user-events-factory';
import { switchMap, map, flatMap } from 'rxjs/operators';
import { UserEvents } from '../entities/user-events';
import { UserEventsStatus } from '../enums/user-events-status';

export class UserEventsRepository implements IUserEventsRepository {
    insert(input: UserEventsInput): Observable<UserEventsResult> {
        return of(UserEventsFactory.entity.fromUserEventsInput(input))
            .pipe(switchMap((entity) => entity.save()))
            .pipe(map((entity) => UserEventsFactory.result.fromUserEventsEntity(entity)));
    }

    delete(parameter: any): Observable<number | null | undefined> {
            return from(UserEvents.delete(parameter))
                .pipe(map((res) => res.affected));
        }

    update(eventId: string, userId: string, status: UserEventsStatus): Observable<UserEventsResult> {
        return from(UserEvents.findOneOrFail({ eventId, userId }))
            .pipe(map((userEvent) => {
                userEvent.status = status;
                return userEvent;
            }))
            .pipe(flatMap((updatedEntity) => updatedEntity.save()))
            .pipe(map((entity) => UserEventsFactory.result.fromUserEventsEntity(entity)));
    }

    get(eventId: string): Observable<UserEventsResult[]> {
        return from(UserEvents.find({ eventId }))
            .pipe(map((entities) => UserEventsFactory.results.fromUserEventsEntities(entities)));
    }

    find(parameter: any): Observable<UserEventsResult[]> {
        return from(UserEvents.find(parameter))
            .pipe(map((entities) => UserEventsFactory.results.fromUserEventsEntities(entities)));
    }

    getByStatus(eventId: string, status: UserEventsStatus): Observable<UserEventsResult[]> {
        return from(UserEvents.find({ eventId, status }))
            .pipe(map((entities) => UserEventsFactory.results.fromUserEventsEntities(entities)));
    }

    approvedSpots(eventId: string): Observable<number> {
        return from(UserEvents.count({ eventId, status: UserEventsStatus.Approved }));
    }
}
