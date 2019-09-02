import { Observable } from 'rxjs';
import { Notification as NotificationResult } from '../models/results/notification';
import { Pagination } from '../models/results/pagination';
import { NotificationInput } from '../models/inputs/notification-input';
import { PaginationParameter } from '../models/parameters/pagination-parameter';

export interface INotificationRepository {
    get(parameter: PaginationParameter): Observable<Pagination>;

    insert(input: NotificationInput): Observable<NotificationResult>;

    markAllAsRead(): Observable<boolean>;
}
