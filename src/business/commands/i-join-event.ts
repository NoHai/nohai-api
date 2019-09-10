import { IObservableCommand } from './core/i-observable-command';
import { Nothing } from '../models/nothing';

export interface IJoinEvent extends IObservableCommand<string, boolean> {
}
