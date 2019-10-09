export class FacebookCredentialsInput {
    accessToken!: string;
    userId!: string;

    constructor(init?: any) {
        Object.assign(this, init);
    }
}
