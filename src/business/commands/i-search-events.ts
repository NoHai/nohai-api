import { IObservableCommand } from './core/i-observable-command';
import { Pagination } from '../models/results/pagination';
import { SearchEventsParameter } from '../models/parameters/search-events-parameter';

export interface ISearchEvents extends IObservableCommand<SearchEventsParameter, Pagination> {
}
