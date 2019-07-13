import { UpdateEventInput } from '../models/inputs/update-event-input';
import { Event } from '../models/results/event';
import { IObservableCommand } from './core/i-observable-command';

export interface IUpdateEvent extends IObservableCommand<UpdateEventInput, Event> {
}
