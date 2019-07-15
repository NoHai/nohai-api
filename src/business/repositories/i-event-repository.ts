import { Observable } from 'rxjs';
import { EventInput } from '../models/inputs/event-input';
import { UpdateEventInput } from '../models/inputs/update-event-input';
import { Event as EventResult } from '../models/results/event';

export interface IEventRepository {
    insert(input: EventInput): Observable<EventResult>;
    update(input: UpdateEventInput): Observable<EventResult>;
}
