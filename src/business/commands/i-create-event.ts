import { EventInput } from '../models/inputs/event-input';
import { Event } from '../models/results/event';
import { IObservableCommand } from './core/i-observable-command';

export interface ICreateEvent extends IObservableCommand<EventInput, Event> {
}
