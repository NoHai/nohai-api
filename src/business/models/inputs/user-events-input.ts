import { Event } from '../../../data/entities/event';
import { User } from '../../../data/entities/user';

export class UserEventsInput {
    event!: Event;
    user!: User;
    status!: number;

    constructor(init?: any) {
        Object.assign(this, init);
    }
}
