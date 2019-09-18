import { City } from '../../../data/entities/city';
import { County } from '../../../data/entities/county';

export class AddressInput {
    streetName!: string;
    longitude!: number;
    latitude!: number;
    city!: string;
    county!: string;

    constructor(init?: any) {
        Object.assign(this, init);
    }
}
