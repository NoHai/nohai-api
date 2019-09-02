import { Notification } from '../models/results/notification';
import { IObservableCommand } from './core/i-observable-command';
import { NotificationInput } from '../models/inputs/notification-input';

export interface ICreateNotification extends IObservableCommand<NotificationInput, Notification> {
}
