import { IObservableCommand } from './core/i-observable-command';

export interface IResendActivationEmail extends IObservableCommand<string, boolean> {
}
