import { IGetCities } from './i-get-cities';
import { Observable } from 'rxjs';
import { City } from '../models/results/city';
import { ICityRepository } from '../repositories/i-city-repository';

export class GetCities implements IGetCities {
    constructor(private readonly cityRepository: ICityRepository) {

    }

    execute(parameter: string): Observable<City[]> {
        return this.cityRepository.get(parameter);
    }
}
