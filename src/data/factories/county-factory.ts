import { County as CountyResult } from '../../business/models/results/county';
import { County as CountyEntity } from '../entities/county';

export class CountyFactory {
    static entity = {
        fromCountyResult: (county: CountyResult) => new CountyEntity(county),
    };

    static result = {
        fromCountyEntity: (county: CountyEntity) => new CountyResult(county),
    };

    static results = {
        fromCountyEntities : (cities: CountyEntity[]): CountyResult[] =>
            cities.map((city) => new CountyResult(city)),
    };
}
