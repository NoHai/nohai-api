export class Event {
    title!: string;

    constructor(init?: Partial<Event>) {
        Object.assign(this, init);
    }
}
