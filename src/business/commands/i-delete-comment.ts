import { IObservableCommand } from './core/i-observable-command';

export interface IDeleteComment extends IObservableCommand<string, boolean> {
}
