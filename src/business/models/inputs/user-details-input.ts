import { UserSports } from '../../../data/entities/user_sports';
export class UserDetailsInput {
    id?: string;
    firstName!: string;
    lastName!: string;
    city!: string;
    picture!: string;
    dateOfBirth!: any;
    jobTitle!: string;
    webPage!: string;
    facebookPage!: any;
    description!: string;
    favoriteSports!: UserSports[];

    constructor(init?: any) {
        Object.assign(this, init);
    }
}
