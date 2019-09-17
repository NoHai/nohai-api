import { County } from '../models/results/county';
import { IObservableCommand } from './core/i-observable-command';

export interface IGetCounties extends IObservableCommand<string, County> {
}
