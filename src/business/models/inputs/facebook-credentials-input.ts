export class FacebookCredentialsInput {
    login!: string;
    firstName!: string;
    lastName!: string;

    constructor(init?: any) {
        Object.assign(this, init);
    }
}
