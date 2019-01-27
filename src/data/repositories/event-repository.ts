import { Observable } from 'rxjs';
import { Event } from '../../business/models/event';
import { IEventRepository } from '../../business/repositories/i-event-repository';

export class EventRepository implements IEventRepository {
    insert(event: Event): Observable<Event> {
        return Observable.create(new Event());
    }
}
