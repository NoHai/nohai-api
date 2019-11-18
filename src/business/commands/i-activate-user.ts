import { IObservableCommand } from './core/i-observable-command';

export interface IActivateUser extends IObservableCommand<string, boolean> { }
