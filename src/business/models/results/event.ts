export class Event {
    title!: string;
    description!: string;
    location!: string;
    sport!: string;
    participantsNumber!: number;
    cost!: number;

    constructor(init?: Partial<Event>) {
        Object.assign(this, init);
    }
}
