import { AddressInput } from '../inputs/address-input';

export class Address extends AddressInput {
    id!: string;

    constructor(init?: any) {
        super(init);
        Object.assign(this, init);
    }
}
