export class EventInput {
    title!: string;

    constructor(init?: Partial<EventInput>) {
        Object.assign(this, init);
    }
}
