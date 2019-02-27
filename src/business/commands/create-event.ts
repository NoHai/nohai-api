import { Observable } from 'rxjs';
import { Event } from '../models/event';
import { IEventRepository } from '../repositories/i-event-repository';
import { ICreateEvent } from './i-create-event';

export class CreateEvent implements ICreateEvent {
    constructor(private eventRepository: IEventRepository) {
    }

    execute(input: Event): Observable<Event> {
        return this.eventRepository.insert(input);
    }
}
