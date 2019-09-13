import { NotificationToken as NotificationTokenResult } from '../../business/models/results/notification-token';
import { INotificationTokenRepository } from '../../business/repositories/i-notification-token-repository';
import { NotificationTokenInput } from '../../business/models/inputs/notification-token-input';
import { Observable, of, from } from 'rxjs';
import { NotificationTokenFactory } from '../factories/notification-token-factory';
import { map, switchMap } from 'rxjs/operators';
import { NotificationToken } from '../entities/notification-token';
import { UserContext } from '../../utilities/user-context';

export class NotificationTokenRepository implements INotificationTokenRepository {

    constructor(private readonly userContext: UserContext) {
    }

    insert(token: string): Observable<NotificationTokenResult> {
        const notificationInput = new NotificationTokenInput({ token,
                userId: this.userContext.userId,
        });
        return of(NotificationTokenFactory.entity.fromNotificationTokenInput(notificationInput))
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
