export class EventsParameter {
    title!: string;
    pageSize!: number;

    constructor(init?: any) {
        Object.assign(this, init);
    }

}
