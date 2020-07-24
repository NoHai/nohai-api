export class CredentialsInput {
    login!: string;
    password!: string;
    loginWithFb: string;

    constructor(init?: any) {
        this.loginWithFb = '';
        Object.assign(this, init);
    }
}
