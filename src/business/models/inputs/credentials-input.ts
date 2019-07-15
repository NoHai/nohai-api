export class CredentialsInput {
    login!: string;
    password!: string;

    constructor(init?: any) {
        Object.assign(this, init);
    }
}
