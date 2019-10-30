import { IObservableCommand } from './core/i-observable-command';

export interface ICancelEvent extends IObservableCommand<string, boolean> {
}
