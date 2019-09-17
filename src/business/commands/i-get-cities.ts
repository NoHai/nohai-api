import { City } from '../models/results/city';
import { IObservableCommand } from './core/i-observable-command';

export interface IGetCities extends IObservableCommand<string, City[]> {
}
