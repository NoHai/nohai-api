import { UserInput } from '../inputs/user-input';

export class User extends UserInput {
    id!: string;
    enabled!: boolean;

    constructor(init?: any) {
        super(init);
        Object.assign(this, init);
    }
}
