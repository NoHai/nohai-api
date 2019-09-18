import { Event } from './event';
import { UserEvents } from './user-events';

export class EventDetails {
    event!: Event;
    userEvents!: UserEvents[];

    constructor(init?: any) {
        Object.assign(this, init);
    }
}
