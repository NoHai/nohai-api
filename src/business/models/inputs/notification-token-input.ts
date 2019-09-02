export class NotificationTokenInput {
    userId!: string;
    token!: string;

    constructor(init?: any) {
        Object.assign(this, init);
    }
}
