import { IObservableCommand } from './core/i-observable-command';
import { NotificationToken } from '../models/results/notification-token';

export interface IGetNotificationTokens extends IObservableCommand<string, NotificationToken[]> {
}
