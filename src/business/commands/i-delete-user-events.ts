import { IObservableCommand } from './core/i-observable-command';

export interface IDeleteUserEvents extends IObservableCommand<string, number | undefined> {
}
