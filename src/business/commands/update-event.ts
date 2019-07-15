import { Observable } from 'rxjs';
import { UpdateEventInput } from '../models/inputs/update-event-input';
import { Event as EventResult } from '../models/results/event';
import { IEventRepository } from '../repositories/i-event-repository';
import { IUpdateEvent } from './i-update-event';

export class UpdateEvent implements IUpdateEvent {
    constructor(private eventRepository: IEventRepository) {
    }

    execute(input: UpdateEventInput): Observable<EventResult> {
        return this.eventRepository.update(input);
    }
}
