import { IMarkAllAsRead } from './i-mark-all-as-read';
import { Observable } from 'rxjs';
import { INotificationRepository } from '../repositories/i-notification-repository';

export class MarkAllAsRead implements IMarkAllAsRead {
    constructor(private readonly notificationRepository: INotificationRepository) {
    }
    execute(): Observable<boolean> {
        return this.notificationRepository.markAllAsRead();
    }
}
