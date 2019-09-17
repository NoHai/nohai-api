import { User } from '../models/results/user';
import { IObservableCommand } from './core/i-observable-command';
import { Nothing } from '../models/nothing';

export interface IGetUserById extends IObservableCommand<Nothing, User> {
}
