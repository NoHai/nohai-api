import { Tokens } from '../models/results/tokens';
import { IObservableCommand } from './core/i-observable-command';

export interface IRefreshToken extends IObservableCommand<string, Tokens | undefined> {
}
