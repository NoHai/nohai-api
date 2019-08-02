import { Observable } from 'rxjs';
import { Event as EventResult } from '../models/results/event';
import { IEventRepository } from '../repositories/i-event-repository';
import { IGetEventById } from './i-get-event-by-id';

export class GetEventById implements IGetEventById {
    constructor(private eventRepository: IEventRepository) {
    }

    execute(id: string): Observable<EventResult> {
        return this.eventRepository.getById(id);
    }
}
