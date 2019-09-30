import { NotificationToken } from '../models/results/notification-token';
import { IObservableCommand } from './core/i-observable-command';

export interface ICreateNotificationToken extends IObservableCommand<string, NotificationToken | undefined> {
}
