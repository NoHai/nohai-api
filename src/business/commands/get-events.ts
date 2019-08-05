import { Observable } from 'rxjs';
import { EventsParameter } from '../models/parameters/events-parameter';
import { Pagination } from '../models/results/pagination';
import { IEventRepository } from '../repositories/i-event-repository';
import { IGetEvents } from './i-get-events';

export class GetEvents implements IGetEvents {
    constructor(private eventRepository: IEventRepository) {
    }

    execute(input: EventsParameter): Observable<Pagination> {
        return this.eventRepository.get(input);
    }
}
