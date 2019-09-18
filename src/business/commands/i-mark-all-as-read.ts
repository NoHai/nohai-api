import { IObservableCommand } from './core/i-observable-command';
import { Nothing } from '../models/nothing';

export interface IMarkAllAsRead extends IObservableCommand<Nothing, boolean> {
}
