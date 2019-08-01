import { UpdateUserInput } from '../models/inputs/update-user-input';
import { User } from '../models/results/user';
import { IObservableCommand } from './core/i-observable-command';

export interface IUpdateUser extends IObservableCommand<UpdateUserInput, User> {
}
