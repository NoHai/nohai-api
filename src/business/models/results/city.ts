export class City {
    id!: string;
    name!: string;

    constructor(init?: any) {
        Object.assign(this, init);
    }
}
