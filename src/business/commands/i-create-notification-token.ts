import { NotificationToken } from '../models/results/notification-token';
import { IObservableCommand } from './core/i-observable-command';
import { NotificationTokenInput } from '../models/inputs/notification-token-input';

export interface ICreateNotificationToken extends IObservableCommand<NotificationTokenInput, NotificationToken> {
}
