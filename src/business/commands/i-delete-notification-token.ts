import { IObservableCommand } from './core/i-observable-command';

export interface IDeleteNotificationToken extends IObservableCommand<string, number | null | undefined> {
}
