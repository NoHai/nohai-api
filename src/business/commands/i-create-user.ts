import { CredentialsInput } from '../models/inputs/credentials-input';
import { Credentials } from '../models/results/credentials';
import { IObservableCommand } from './core/i-observable-command';

export interface ICreateUser extends IObservableCommand<CredentialsInput, Credentials> {
}
