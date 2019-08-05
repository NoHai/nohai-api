export class Sport {
    id!: string;
    name!: string;
    description!: string;
    defaultParticipantsNumber!: number;

    constructor(init?: any) {
        Object.assign(this, init);
    }
}
