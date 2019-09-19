import { IMarkAsRead } from './i-mark-as-read';
import { INotificationRepository } from '../repositories/i-notification-repository';
import { Observable } from 'rxjs';
import { Notification } from '../models/results/notification';

export class MarkAsRead implements IMarkAsRead {
    constructor(private readonly notificationRepository: INotificationRepository) {

    }

    execute(input: string): Observable<Notification> {
        return this.notificationRepository.markAsRead(input);
    }
}
