import { Sport } from '../models/results/sport';
import { IObservableCommand } from './core/i-observable-command';

export interface IGetSports extends IObservableCommand<null, Sport> {
}
