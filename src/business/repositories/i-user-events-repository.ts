import { Observable } from 'rxjs';
import { UserEventsInput } from '../models/inputs/user-events-input';
import { UserEvents as UserEventsResult } from '../models/results/user-events';
import { NotificationStatus } from '../../data/enums/notification-status';

export interface IUserEventsRepository {
    insert(event: UserEventsInput): Observable<UserEventsResult>;

    update(eventId: string, userId: string, status: NotificationStatus): Observable<UserEventsResult>;

    delete(eventId: string, userId: string): Observable<number | undefined>;
}
