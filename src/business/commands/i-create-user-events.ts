import { IObservableCommand } from './core/i-observable-command';
import { UserEventsInput } from '../models/inputs/user-events-input';
import { UserEvents } from '../models/results/user-events';

export interface ICreateUserEvents extends IObservableCommand<UserEventsInput, UserEvents> {
}
