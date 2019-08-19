export class County {
    id!: string;
    name!: string;

    constructor(init?: any) {
        Object.assign(this, init);
    }
}
