import { Address } from '../../../data/entities/address';
import { Sport } from '../../../data/entities/sport';

export class EventInput {
    owner!: string;
    title!: string;
    description!: string;
    address!: Address;
    sport!: Sport;
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
