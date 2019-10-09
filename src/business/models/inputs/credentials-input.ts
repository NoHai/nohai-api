export class CredentialsInput {
    login!: string;
    password!: string;
    loginWithFb: boolean;

    constructor(init?: any) {
        this.loginWithFb = false;
        Object.assign(this, init);
    }
}
