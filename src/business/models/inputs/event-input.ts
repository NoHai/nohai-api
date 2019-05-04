export class EventInput {
    title!: string;
    description!: string;
    location!: any;
    sport!: any;
    participantsNumber!: number;
    cost!: number;

    constructor(init?: Partial<EventInput>) {
        Object.assign(this, init);
    }
}
