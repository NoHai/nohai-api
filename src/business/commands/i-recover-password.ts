import { IObservableCommand } from './core/i-observable-command';

export interface IRecoverPassword extends IObservableCommand<string, string> {
}
