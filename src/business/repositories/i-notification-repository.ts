import { Observable } from 'rxjs';
import { Notification as NotificationResult } from '../models/results/notification';
import { Pagination } from '../models/results/pagination';
import { NotificationInput } from '../models/inputs/notification-input';
import { PaginationParameter } from '../models/parameters/pagination-parameter';

export interface INotificationRepository {
    get(parameter: PaginationParameter): Observable<Pagination>;

    getById(id: string): Observable<NotificationResult>;

    markAsRead(id: string): Observable<NotificationResult>;

    insert(input: NotificationInput): Observable<NotificationResult>;

    markAllAsRead(): Observable<boolean>;

    joinEvent(eventId: string): Observable<NotificationResult>;

    approve(eventId: string, userId: string): Observable<NotificationResult>;

    reject(eventId: string, userId: string): Observable<NotificationResult>;

    rejectAll(parameter: any): Observable<NotificationResult[]>;
}
