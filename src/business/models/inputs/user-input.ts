import { UserDetailsInput } from './user-details-input';

export class UserInput {
    sports!: string[];
    details!: UserDetailsInput;
    loginWithFb?: string;

    constructor(init?: any) {
        Object.assign(this, init);
    }
}
