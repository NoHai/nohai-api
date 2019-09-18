import { User } from './user';

export class Tokens {
    user = new User();
    accessToken!: string;
    refreshToken!: string;
    expireIn!: number;

    constructor(init?: any) {
        Object.assign(this, init);
    }
}
