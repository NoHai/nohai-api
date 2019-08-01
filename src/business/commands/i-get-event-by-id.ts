import { Event } from '../models/results/event';
import { IObservableCommand } from './core/i-observable-command';

export interface IGetEventById extends IObservableCommand<any, Event> {
}
