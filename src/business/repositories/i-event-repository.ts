import { Observable } from 'rxjs';
import { Event } from '../models/results/event';

export interface IEventRepository {
    insert(event: Event): Observable<Event>;
}
