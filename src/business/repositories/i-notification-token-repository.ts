import { Observable } from 'rxjs';
import { NotificationToken as NotificationTokenResult } from '../models/results/notification-token';

export interface INotificationTokenRepository {
    get(userId: string): Observable<NotificationTokenResult[]>;

    insert(input: string): Observable<NotificationTokenResult>;

    delete(userId: string, token: string): Observable<number | null | undefined>;

    find(parameter: any): Observable<NotificationTokenResult[]>;
}
