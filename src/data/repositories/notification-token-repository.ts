import { NotificationToken as NotificationTokenResult } from '../../business/models/results/notification-token';
import { INotificationTokenRepository } from '../../business/repositories/i-notification-token-repository';
import { NotificationTokenInput } from '../../business/models/inputs/notification-token-input';
import { Observable, of, from } from 'rxjs';
import { NotificationTokenFactory } from '../factories/notification-token-factory';
import { map, switchMap } from 'rxjs/operators';
import { NotificationToken } from '../entities/notification-token';

export class NotificationTokenRepository implements INotificationTokenRepository {

    insert(input: NotificationTokenInput): Observable<NotificationTokenResult> {
        return of(NotificationTokenFactory.entity.fromNotificationTokenInput(input))
        .pipe(switchMap((entity) => entity.save()))
        .pipe(map((entity) => NotificationTokenFactory.result.fromNotificationTokenEntity(entity)));
    }

    delete(id: string): Observable<number | undefined> {
        return  from(NotificationToken.delete(id))
            .pipe(map((res) => res.affected));
    }

    get(userId: string): Observable<NotificationTokenResult[]> {
      return of(NotificationToken.find({ userId }))
            .pipe(switchMap((entities) => from(entities)))
            .pipe(map((entity) =>  NotificationTokenFactory.results.fromNotificationTokenEntities(entity)));
    }
}
