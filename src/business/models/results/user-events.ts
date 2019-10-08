import { UserEventsInput } from '../inputs/user-events-input';
import { User } from './user';

export class UserEvents extends UserEventsInput {
    id!: string;
    user!: User;

    constructor(init?: any) {
        super(init);
        Object.assign(this, init);
    }
}
