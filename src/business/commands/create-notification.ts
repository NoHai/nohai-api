import { NotificationInput } from '../models/inputs/notification-input';
import { Notification } from '../models/results/notification';
import { ICreateNotification } from './i-create-notification';
import { INotificationRepository } from '../repositories/i-notification-repository';
import { Observable } from 'rxjs';

export class CreateNotification implements ICreateNotification {
    constructor(private readonly notificationRepository: INotificationRepository) {
    }

    execute(input: NotificationInput): Observable<Notification> {
        return this.notificationRepository.insert(input);
    }
}
