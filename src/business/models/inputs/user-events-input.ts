export class UserEventsInput {
    eventId!: string;
    userId!: string;
    status!: number;

    constructor(init?: any) {
        Object.assign(this, init);
    }
}
