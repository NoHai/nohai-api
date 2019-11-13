import { ISearchEvents } from './i-search-events';
import { Pagination } from '../models/results/pagination';
import { Observable } from 'rxjs';
import { SearchEventsParameter } from '../models/parameters/search-events-parameter';
import { IEventRepository } from '../repositories/i-event-repository';

export class SearchEvents implements ISearchEvents {

    constructor(private readonly eventRepository: IEventRepository) {
    }

    execute(parameter: SearchEventsParameter): Observable<Pagination> {
        return this.eventRepository.find(parameter);
    }
}

