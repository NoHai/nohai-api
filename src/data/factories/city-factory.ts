import { City as CityResult } from '../../business/models/results/city';
import { City as CityEntity } from '../entities/city';
import { CountyFactory } from './county-factory';

export class CityFactory {
    static entity = {
        fromCityResult: (city: CityResult) => new CityEntity({
            ...city,
            county: CountyFactory.entity.fromCountyResult(city.county),
        }),
    };

    static result = {
        fromCityEntity: (city: CityEntity) => new CityResult({ ...city,
            county: CountyFactory.result.fromCountyEntity(city.county) }),
    };
}
