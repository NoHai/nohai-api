import { NotificationTokenInput } from '../models/inputs/notification-token-input';
import { ICreateNotificationToken } from './i-create-notification-token';
import { INotificationTokenRepository } from '../repositories/i-notification-token-repository';
import { Observable } from 'rxjs';
import { NotificationToken } from '../models/results/notification-token';

export class CreateNotificationToken implements ICreateNotificationToken {
    constructor(private readonly notificationTokenRepository: INotificationTokenRepository) {
    }

    execute(input: NotificationTokenInput): Observable<NotificationToken> {
        return this.notificationTokenRepository.insert(input);
    }
}
