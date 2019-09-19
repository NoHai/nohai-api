import { User } from '../models/results/user';
import { IObservableCommand } from './core/i-observable-command';

export interface IGetUserById extends IObservableCommand<string, User> {
}
