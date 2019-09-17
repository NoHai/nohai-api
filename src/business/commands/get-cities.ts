import { IGetCities } from './i-get-cities';
import { Observable } from 'rxjs';
import { City } from '../models/results/city';

export class GetCities implements IGetCities {
    execute(input: string): Observable<City> {
        throw new Error('Method not implemented.');
    }
}
