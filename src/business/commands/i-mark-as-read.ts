import { IObservableCommand } from './core/i-observable-command';
import { Notification } from '../models/results/notification';

export interface IMarkAsRead extends IObservableCommand<string, Notification> {
}
