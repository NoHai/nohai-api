import { CredentialsInput } from '../models/inputs/credentials-input';
import { Tokens } from '../models/results/tokens';
import { IObservableCommand } from './core/i-observable-command';

export interface ICreateTokens extends IObservableCommand<CredentialsInput, Tokens> {
}
