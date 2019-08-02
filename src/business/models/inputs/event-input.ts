export class EventInput {
    owner!: string;
    title!: string;
    description!: string;
    location!: string;
    sport!: string;
    participantsNumber!: number;
    cost!: number;
    date!: string;
    hour!: string;
    duration!: number;

    constructor(init?: any) {
        Object.assign(this, init);
    }
}
