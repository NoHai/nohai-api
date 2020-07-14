import { UserDetailsInput } from './user-details-input';

export class UserInput {
    sports!: string[];
    details!: UserDetailsInput;
    loginWithFb!: boolean;

    constructor(init?: any) {
        Object.assign(this, init);
    }
}
