import { Observable } from 'rxjs';
import { EventInput } from '../models/inputs/event-input';
import { UpdateEventInput } from '../models/inputs/update-event-input';
import { EventsParameter } from '../models/parameters/events-parameter';
import { Event as EventResult } from '../models/results/event';

export interface IEventRepository {
    insert(input: EventInput): Observable<EventResult>;
    update(input: UpdateEventInput): Observable<EventResult>;
    get(parameter: EventsParameter): Observable<EventResult[]>;
    getById(id: any): Observable<EventResult>;
}
