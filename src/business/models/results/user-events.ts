import { UserEventsInput } from '../inputs/user-events-input';

export class UserEvents extends UserEventsInput {
    id!: string;

    constructor(init?: any) {
        super(init);
        Object.assign(this, init);
    }
}
