import { Address } from '../../../data/entities/address';
import { Sport } from '../../../data/entities/sport';
import { User } from '../../../data/entities/user';

export class EventInput {
    owner!: User;
    title!: string;
    description!: string;
    address!: Address;
    sport!: Sport;
    freeSpots!: number;
    cost!: number;
    startDate!: string;
    endDate!: string;
    startTime!: string;
    endTime!: string;
    level!: number;

    constructor(init?: any) {
        Object.assign(this, init);
    }
}
