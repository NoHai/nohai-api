import { Pagination } from '../models/results/pagination';
import { IObservableCommand } from './core/i-observable-command';
import { PaginationParameter } from '../models/parameters/pagination-parameter';

export interface IGetNotifications extends IObservableCommand<PaginationParameter, Pagination> {
}
