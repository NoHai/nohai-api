import { IUserEventsRepository } from '../../business/repositories/i-user-events-repository';
import { UserEventsInput } from '../../business/models/inputs/user-events-input';
import { UserEvents as UserEventsResult } from '../../business/models/results/user-events';
import { Observable, of, from } from 'rxjs';
import { UserEventsFactory } from '../factories/user-events-factory';
import { switchMap, map, flatMap } from 'rxjs/operators';
import { UserEvents } from '../entities/user-events';
import { NotificationType } from '../enums/notification-type';

export class UserEventsRepository implements IUserEventsRepository {
    insert(input: UserEventsInput): Observable<UserEventsResult> {
        return of(UserEventsFactory.entity.fromUserEventsInput(input))
            .pipe(switchMap((entity) => entity.save()))
            .pipe(map((entity) => UserEventsFactory.result.fromUserEventsEntity(entity)));
    }

    delete(eventId: string, userId: string): Observable<number | undefined> {
        return from(UserEvents.findOneOrFail({ eventId, userId }))
            .pipe(flatMap((userEvent) => UserEvents.delete(userEvent.id)))
            .pipe(map((res) => res.affected));
    }

    update(eventId: string, userId: string, status: NotificationType): Observable<UserEventsResult> {
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
}
