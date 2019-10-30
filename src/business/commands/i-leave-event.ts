import { IObservableCommand } from './core/i-observable-command';

export interface ILeaveEvent extends IObservableCommand<string, boolean> {
}
