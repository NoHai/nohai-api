import { Address as AddressResult } from '../../business/models/results/address';
import { Address as AddressEntity } from '../entities/address';

export class AddressFactory {
    static entity = {
        fromAddressResult: (address: AddressResult) => new AddressEntity(address),
    };

    static result = {
        fromAddressEntity: (address: AddressEntity) => new AddressResult(address),
    };
}
