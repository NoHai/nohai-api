import { IObservableCommand } from './core/i-observable-command';
import { CredentialsInput } from '../models/inputs/credentials-input';

export interface IUpdateCredentials extends IObservableCommand<CredentialsInput, void> {
}
