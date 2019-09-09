import { User } from '../data/entities/user';
import { Event } from '../data/entities/event';
export class NotificationHelper {

    static joinNotificationBody(event: Event, user: User): string {
        return `${user.firstName} ${user.lastName} doreste sa se alature evenimentului creat de tine - ${event.title}`;
    }

    static  joinNotificationTitle(){
        return 'Cerere de alaturare';
    }
}