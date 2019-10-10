import { Observable } from 'rxjs';
import { UserEventsInput } from '../models/inputs/user-events-input';
import { UserEvents as UserEventsResult } from '../models/results/user-events';
import { UserEventsStatus } from '../../data/enums/user-events-status';

export interface IUserEventsRepository {
    insert(event: UserEventsInput): Observable<UserEventsResult>;

    update(eventId: string, userId: string, status: UserEventsStatus): Observable<UserEventsResult>;

    delete(eventId: string, userId: string): Observable<number | undefined>;

    get(eventId: string): Observable<UserEventsResult[]>;

    approvedSpots(eventId: string): Observable<number>;

    getByStatus(eventId: string, status: UserEventsStatus): Observable<UserEventsResult[]>;

    deleteByStatus(eventId: string, status: UserEventsStatus): Observable<number | undefined>;

    find(parameter: any): Observable<UserEventsResult[]>;
}
