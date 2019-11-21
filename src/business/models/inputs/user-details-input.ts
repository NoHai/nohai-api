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

    constructor(init?: any) {
        Object.assign(this, init);
    }
}
