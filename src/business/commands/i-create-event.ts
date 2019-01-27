import { Event } from '../models/event';
import { ICommand } from './core/i-command';

export interface ICreateEvent extends ICommand<Event, Event> {
}
