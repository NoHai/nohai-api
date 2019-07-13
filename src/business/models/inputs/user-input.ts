export class UserInput {
    firstName!: string;
    lastName!: string;
    dateOfBirth!: Date;
    height!: number;
    weight!: number;
    picture!: any;
    city!: any;

    constructor(init?: any) {
        Object.assign(this, init);
    }
}
