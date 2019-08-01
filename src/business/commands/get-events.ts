import { Observable } from 'rxjs';
import { EventsParameter } from '../models/parameters/events-parameter';
import { Event as EventResult } from '../models/results/event';
import { IEventRepository } from '../repositories/i-event-repository';
import { IGetEvents } from './i-get-events';

export class GetEvents implements IGetEvents {
    constructor(private eventRepository: IEventRepository) {
    }

    execute(input: EventsParameter): Observable<EventResult[]> {
        return this.eventRepository.get(input);
    }
}
