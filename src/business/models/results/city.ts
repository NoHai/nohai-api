export class City {
    id!: string;
    name!: string;
    countyId!: string;

    constructor(init?: any) {
        Object.assign(this, init);
    }
}
