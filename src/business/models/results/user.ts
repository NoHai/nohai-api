export class User {
    firstName!: string;
    lastName!: string;
    dateOfBirth!: Date;
    height!: number;
    weight!: number;
    picture!: any;
    city!: any;

    constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}
