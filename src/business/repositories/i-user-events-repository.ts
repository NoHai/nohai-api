import { Observable } from 'rxjs';
import { UserEventsInput } from '../models/inputs/user-events-input';
import { UserEvents as UserEventsResult } from '../models/results/user-events';

export interface IUserEventsRepository {
    insert(event: UserEventsInput): Observable<UserEventsResult>;

    delete(id: string): Observable<number | undefined>;
}
