import { Observable } from 'rxjs';
import { Event } from '../models/event';

export interface IEventRepository {
    insert(event: Event): Observable<Event>;
}
