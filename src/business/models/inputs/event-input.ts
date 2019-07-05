export class EventInput {
    title!: string;
    description!: string;
    location!: string;
    sport!: string;
    participantsNumber!: number;
    cost!: number;

    constructor(init?: Partial<EventInput>) {
        Object.assign(this, init);
    }
}
