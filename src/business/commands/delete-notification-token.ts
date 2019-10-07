import { INotificationTokenRepository } from '../repositories/i-notification-token-repository';
import { Observable } from 'rxjs';
import { IDeleteNotificationToken } from './i-delete-notification-token';
import { UserContext } from '../../utilities/user-context';

export class DeleteNotificationToken implements IDeleteNotificationToken {
    constructor(private readonly notificationTokenRepository: INotificationTokenRepository,
                private readonly userContext: UserContext) {
    }

    execute(id: string): Observable<number | undefined> {
        return this.notificationTokenRepository.delete(this.userContext.userId, id);
    }
}
