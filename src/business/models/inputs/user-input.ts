export class UserInput {
    firstName!: string;
    lastName!: string;
    dateOfBirth!: string;
    height!: number;
    weight!: number;
    city!: string;
    favoriteSport!: string;
    loginWithFb!: boolean;

    constructor(init?: any) {
        Object.assign(this, init);
    }
}
