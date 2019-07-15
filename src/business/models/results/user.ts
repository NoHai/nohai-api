import { UserInput } from '../inputs/user-input';

export class User extends UserInput {
    constructor(init?: any) {
        super(init);
        Object.assign(this, init);
    }
}
