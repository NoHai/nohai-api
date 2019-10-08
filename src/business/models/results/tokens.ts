import { User } from './user';

export class Tokens {
    id!: string;
    user!: User;
    accessToken!: string;
    refreshToken!: string;
    expireIn!: number;

    constructor(init?: any) {
        Object.assign(this, init);
    }
}
