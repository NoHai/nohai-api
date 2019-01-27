import { Observable } from 'rxjs';
import { Event } from '../models/event';
import { ICreateEvent } from './i-create-event';

export class CreateEvent implements ICreateEvent {
    execute(input: Event): Observable<Event> {
        return Observable.create(new Event());
    }
}
