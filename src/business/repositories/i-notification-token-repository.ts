import { Observable } from 'rxjs';
import { NotificationToken as NotificationTokenResult } from '../models/results/notification-token';

export interface INotificationTokenRepository {
    get(userId: string): Observable<NotificationTokenResult[]>;

    insert(input: any): Observable<NotificationTokenResult>;

    delete(id: string): Observable<number | undefined>;
}
