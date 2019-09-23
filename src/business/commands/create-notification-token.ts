import { ICreateNotificationToken } from './i-create-notification-token';
import { INotificationTokenRepository } from '../repositories/i-notification-token-repository';
import { Observable, from, of } from 'rxjs';
import { NotificationToken as NotificationTokenResult } from '../models/results/notification-token';
import { UserContext } from '../../utilities/user-context';
import { NotificationToken } from '../../data/entities/notification-token';
import { catchError, map } from 'rxjs/operators';

export class CreateNotificationToken implements ICreateNotificationToken {
    constructor(private readonly notificationTokenRepository: INotificationTokenRepository,
                private readonly userContext: UserContext) {
    }

    execute(input: any): Observable<NotificationTokenResult | undefined> {

        return from(NotificationToken.findOneOrFail({ token: input, userId: this.userContext.userId}))
                .pipe(catchError(() => this.notificationTokenRepository.insert(input.login)))
                .pipe(() => of(undefined));
    }
}
