import { UserDetailsInput } from '../inputs/user-details-input';

export class UserDetails extends UserDetailsInput {
    id!: string;

    constructor(init?: any) {
        super();
        Object.assign(this, init);
    }
}
