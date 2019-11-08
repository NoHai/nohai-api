import { IObservableCommand } from './core/i-observable-command';
import { Credentials } from '../models/results/credentials';

export interface IActivateUser extends IObservableCommand<string, Credentials> { }
