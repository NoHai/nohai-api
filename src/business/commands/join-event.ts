import { Observable } from 'rxjs';
import { IJoinEvent } from './i-join-event';
import { UserEvents } from '../models/results/user-events';
import { INotificationRepository } from '../repositories/i-notification-repository';

export class JoinEvent implements IJoinEvent {

    constructor(private readonly notificationRepository: INotificationRepository) {
    }

    execute(eventId: string): Observable<UserEvents> {
        return this.notificationRepository.joinEvent(eventId);
    }
}
