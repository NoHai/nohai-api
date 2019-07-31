import { UserInput } from './user-input';

export class UpdateUserInput extends UserInput {
    id!: string;

    constructor(init?: any) {
        super(init);
        Object.assign(this, init);
    }
}
