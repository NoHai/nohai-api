import { Address } from '../../../data/entities/address';

export class EventInput {
    owner!: string;
    title!: string;
    description!: string;
    address!: Address;
    sport!: string;
    freeSpots!: number;
    cost!: number;
    date!: string;
    hour!: string;
    duration!: number;
    level!: number;

    constructor(init?: any) {
        Object.assign(this, init);
    }
}
