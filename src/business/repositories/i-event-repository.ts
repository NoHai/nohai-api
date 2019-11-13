import { Observable } from 'rxjs';
import { EventInput } from '../models/inputs/event-input';
import { EventsParameter } from '../models/parameters/events-parameter';
import { Event as EventResult } from '../models/results/event';
import { Pagination } from '../models/results/pagination';
import { SearchEventsParameter } from '../models/parameters/search-events-parameter';

export interface IEventRepository {
    insert(input: EventInput): Observable<EventResult>;

    update(input: EventInput): Observable<EventResult>;

    getById(id: string): Observable<EventResult>;

    find(parameter: SearchEventsParameter): Observable<Pagination>;

    delete(id: string): Observable<boolean>;
}
