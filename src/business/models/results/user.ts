export class User {
    firstName!: string;
    lastName!: string;
    dateOfBirth!: Date;
    height!: number;
    weight!: number;
    picture!: any;
    city_id!: number;

    constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}
