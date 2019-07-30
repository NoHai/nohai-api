import { User } from './user';

export class Tokens {
    user = new User();
    accessToken!: string;
    refreshToken!: string;

    constructor(init?: any) {
        Object.assign(this, init);
    }
}
