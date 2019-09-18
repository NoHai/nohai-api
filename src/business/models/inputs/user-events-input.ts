import { User } from '../../../data/entities/user';

export class UserEventsInput {
    eventId!: string;
    user!: User;
    status!: number;

    constructor(init?: any) {
        Object.assign(this, init);
    }
}
