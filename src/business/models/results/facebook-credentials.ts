import { FacebookCredentialsInput } from '../inputs/facebook-credentials-input';

export class FacebookCredentials extends FacebookCredentialsInput {
        id!: string;

        constructor(init?: any) {
            super(init);
            Object.assign(this, init);
        }
}
