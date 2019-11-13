import { IObservableCommand } from './core/i-observable-command';
import { EventInput } from '../models/inputs/event-input';
import { Event } from '../models/results/event';

export interface ISaveEvent extends IObservableCommand<EventInput, Event> { }
