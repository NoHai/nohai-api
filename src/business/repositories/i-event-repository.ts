import { Observable } from 'rxjs';
import { EventInput } from '../models/inputs/event-input';
import { Event as EventResult } from '../models/results/event';

export interface IEventRepository {
    insert(event: EventInput): Observable<EventResult>;
}
