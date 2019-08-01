import { EventsParameter } from '../models/parameters/events-parameter';
import { Event } from '../models/results/event';
import { IObservableCommand } from './core/i-observable-command';

export interface IGetEvents extends IObservableCommand<EventsParameter, Event[]> {
}
