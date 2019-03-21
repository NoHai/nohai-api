import { Observable } from 'rxjs';
import { EventInput } from '../models/inputs/event-input';
import { Event as EventResult } from '../models/results/event';
import { IEventRepository } from '../repositories/i-event-repository';
import { ICreateEvent } from './i-create-event';

export class CreateEvent implements ICreateEvent {
    constructor(private eventRepository: IEventRepository) {
    }

    execute(input: EventInput): Observable<EventResult> {
        return this.eventRepository.insert(input);
    }
}
