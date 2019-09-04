import { City } from '../../../data/entities/city';

export class UserInput {
    firstName!: string;
    lastName!: string;
    dateOfBirth!: Date;
    height!: number;
    weight!: number;
    picture!: any;
    city!: City;

    constructor(init?: any) {
        Object.assign(this, init);
    }
}
