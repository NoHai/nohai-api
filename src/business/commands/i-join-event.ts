import { IObservableCommand } from './core/i-observable-command';
import { UserEvents } from '../models/results/user-events';

export interface IJoinEvent extends IObservableCommand<string, UserEvents> {
}
