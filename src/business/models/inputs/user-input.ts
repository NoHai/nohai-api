export class UserInput {
    firstName!: string;
    lastName!: string;
    dateOfBirth!: Date;
    height!: number;
    weight!: number;
    picture!: any;
    cityId!: number;

    constructor(init?: Partial<UserInput>) {
        Object.assign(this, init);
    }
}
