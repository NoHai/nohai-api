import { Event } from '../models/results/event';
import { IObservableCommand } from './core/i-observable-command';

export interface ICreateEvent extends IObservableCommand<Event, Event> {
}
