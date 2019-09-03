import { NotificationTokenInput } from '../inputs/notification-token-input';

export class NotificationToken extends NotificationTokenInput {
    id!: string;

   constructor(init?: any) {
       super(init);
       Object.assign(this, init);
   }
}
