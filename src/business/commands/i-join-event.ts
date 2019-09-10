import { IObservableCommand } from './core/i-observable-command';

export interface IJoinEvent extends IObservableCommand<string, boolean> {
}
