import { EventsParameter } from '../models/parameters/events-parameter';
import { Pagination } from '../models/results/pagination';
import { IObservableCommand } from './core/i-observable-command';

export interface IGetEvents extends IObservableCommand<EventsParameter, Pagination> {
}
