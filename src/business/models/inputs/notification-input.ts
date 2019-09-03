export class NotificationInput {
    title!: string;
    eventId!: string;
    body!: any;
    type!: number;
    avatarUrl!: string;
    createdDate!: any;
    createdUser!: string;
    status!: number;
    userId!: string;

    constructor(init?: any) {
        Object.assign(this, init);
    }
}
