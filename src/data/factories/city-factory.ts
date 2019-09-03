import { from } from 'rxjs';
import { City as CityResult } from '../../business/models/results/city';
import { City, City as CityEntity } from '../entities/city';

export class CityFactory {
    static entity = {
        fromCityResult: (city: CityResult) => new CityEntity(city),
        fromId: (id: string) => from(City.findOne(id)),
    };

    static result = {
        fromCityEntity: (city: CityEntity) => new CityResult(city),
    };
}
