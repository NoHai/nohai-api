import { IObservableCommand } from './core/i-observable-command';
import { FacebookCredentialsInput } from '../models/inputs/facebook-credentials-input';
import { Tokens } from '../models/results/tokens';

export interface ILoginFacebook extends IObservableCommand<FacebookCredentialsInput, Tokens> {
}
