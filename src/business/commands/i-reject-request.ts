import { IObservableCommand } from './core/i-observable-command';

export interface IRejectRequest extends IObservableCommand<string, boolean> {
}
