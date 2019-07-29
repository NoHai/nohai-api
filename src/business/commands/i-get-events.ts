import { Event } from '../models/results/event';
import { IObservableCommand } from './core/i-observable-command';
import { EventsParameter } from '../models/parameters/events-parameter';

export interface IGetEvents extends IObservableCommand<EventsParameter, Event[]> {
}
