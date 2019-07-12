import { User } from '../models/results/user';
import { IObservableCommand } from './core/i-observable-command';

export interface ICreateUser extends IObservableCommand<User, User> {
}
