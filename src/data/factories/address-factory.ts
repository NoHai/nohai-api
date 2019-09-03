import { Address as AddressResult } from '../../business/models/results/address';
import { Address as AddressEntity } from '../entities/address';
import { CityFactory } from './city-factory';
import { CountyFactory } from './county-factory';

export class AddressFactory {
    static entity = {
        fromAddressResult: (address: AddressResult) => {
            return new AddressEntity({
                ...address,
                city: CityFactory.entity.fromCityResult(address.city),
                county: CountyFactory.entity.fromCountyResult(address.county),
            });
        },
    };

    static result = {
        fromAddressEntity: (address: AddressEntity) => new AddressResult({
            ...address,
            city: CityFactory.result.fromCityEntity(address.city),
            county: CountyFactory.result.fromCountyEntity(address.county),
        }),
    };
}
