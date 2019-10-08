import { EventsParameter } from '../models/parameters/events-parameter';
import { IObservableCommand } from './core/i-observable-command';
import { Pagination } from '../models/results/pagination';

export interface IGetEvents extends IObservableCommand<EventsParameter, Pagination> {
}
