import { Observable } from 'rxjs';
import { INotificationTokenRepository } from '../repositories/i-notification-token-repository';
import { IGetNotificationTokens } from './i-get-notification-tokens';
import { NotificationToken } from '../models/results/notification-token';

export class GetNotificationTokens implements IGetNotificationTokens {

    constructor(private notificationTokenRepository: INotificationTokenRepository) {
    }

    execute(userId: string): Observable<NotificationToken[]> {
        return this.notificationTokenRepository.get(userId);
    }
}
