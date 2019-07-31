import { CredentialsInput } from '../inputs/credentials-input';

export class Credentials extends CredentialsInput {
    id!: string;

    constructor(init?: any) {
        super(init);
        Object.assign(this, init);
    }
}
