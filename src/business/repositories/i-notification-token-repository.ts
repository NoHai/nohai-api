import { Observable } from 'rxjs';
import { NotificationTokenInput } from '../models/inputs/notification-token-input';
import { NotificationToken as NotificationTokenResult } from '../models/results/notification-token';

export interface INotificationTokenRepository {
    get(userId: string): Observable<NotificationTokenResult[]>;

    insert(input: NotificationTokenInput): Observable<NotificationTokenResult>;

    delete(id: string): Observable<number | undefined>;

    getFromEventOwner(eventId: string): Observable<NotificationTokenResult[]>;
}
