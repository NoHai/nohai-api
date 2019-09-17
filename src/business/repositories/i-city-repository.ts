import { Observable } from 'rxjs';
import { City } from '../models/results/city';

export interface ICityRepository {
    get(parameter: string): Observable<City[]>;
}
