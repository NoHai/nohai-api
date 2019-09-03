import { NotificationInput } from '../inputs/notification-input';

export class Notification extends NotificationInput {
    id!: string;

   constructor(init?: any) {
       super(init);
       Object.assign(this, init);
   }
}
