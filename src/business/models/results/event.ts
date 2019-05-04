export class Event {
    title!: string;
    description!: string;
    location!: any;
    sport!: any;
    participantsNumber!: number;
    cost!: number;

    constructor(init?: Partial<Event>) {
        Object.assign(this, init);
    }
}
