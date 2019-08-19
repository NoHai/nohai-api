import { County } from './county';

export class City {
    id!: string;
    name!: string;
    county!: County;

    constructor(init?: any) {
        Object.assign(this, init);
    }
}
