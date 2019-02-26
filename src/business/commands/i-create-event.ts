import { Event } from '../models/event';
import {IObservableCommand} from './core/i-observable-command';

export interface ICreateEvent extends IObservableCommand<Event, Event> {
}
