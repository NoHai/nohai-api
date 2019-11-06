import { IObservableCommand } from './core/i-observable-command';

export interface ICancelPendingRequest extends IObservableCommand<string, boolean> {
}
