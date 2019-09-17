import { City } from '../../../data/entities/city';

export class UserInput {
    firstName!: string;
    lastName!: string;
    dateOfBirth!: string;
    height!: number;
    weight!: number;
    city!: City;
    favoriteSport!: string;
    loginWithFb!: boolean;

    constructor(init?: any) {
        Object.assign(this, init);
    }
}
