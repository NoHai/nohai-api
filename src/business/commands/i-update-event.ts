import { Event } from '../models/results/event';
import { IObservableCommand } from './core/i-observable-command';
import { EventInput } from '../models/inputs/event-input';

export interface IUpdateEvent extends IObservableCommand<EventInput, Event> {
}
