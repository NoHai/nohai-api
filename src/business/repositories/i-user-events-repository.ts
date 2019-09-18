import { Observable } from 'rxjs';
import { UserEventsInput } from '../models/inputs/user-events-input';
import { UserEvents as UserEventsResult } from '../models/results/user-events';
import { NotificationType } from '../../data/enums/notification-type';

export interface IUserEventsRepository {
    insert(event: UserEventsInput): Observable<UserEventsResult>;

    update(eventId: string, userId: string, status: NotificationType): Observable<UserEventsResult>;

    delete(eventId: string, userId: string): Observable<number | undefined>;

    get(eventId: string): Observable<UserEventsResult[]>;
}
