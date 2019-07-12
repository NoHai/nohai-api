export class UserInput {
    firstName!: string;
    lastName!: string;
    dateOfBirth!: Date;
    height!: number;
    weight!: number;
    picture!: any;
    city!: any;

    constructor(init?: Partial<UserInput>) {
        Object.assign(this, init);
    }
}
