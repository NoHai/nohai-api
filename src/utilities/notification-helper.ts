import { User } from '../data/entities/user';
import { Event } from '../data/entities/event';
import { Notification } from '../data/entities/notification';
import { SendNotification } from '../services/send-notification';
import { Observable, from, of } from 'rxjs';
import { NotificationType } from '../data/enums/notification-type';
import { NotificationStatus } from '../data/enums/notification-status';

export class NotificationHelper {

    static buildJoinNotification(event: any, user: any): Notification {
        return new Notification({
            title: NotificationHelper.joinNotificationTitle(),
            body: NotificationHelper.joinNotificationBody(event, user),
            eventId: event.id,
            user: event.owner,
            avatarUrl: user.picture,
            createdUser: user.id,
            createdDate: (new Date()).toUTCString(),
            notificationType: NotificationType.JoinRequest,
            status: NotificationStatus.NotRead,
        });
    }

    static buildApproveNotification(event: any, fromUser: any, toUser: string): Notification {
        return new Notification({
            title: NotificationHelper.joinNotificationTitle(),
            body: NotificationHelper.approveRequestBody(event),
            eventId: event.id,
            user: toUser,
            avatarUrl: fromUser.picture,
            createdUser: event.owner,
            createdDate: (new Date()).toUTCString(),
            notificationType: NotificationType.JoinRequest,
            status: NotificationStatus.NotRead,
        });
    }

    static buildRejectNotification(event: any, fromUser: any, toUser: string): Notification {
        return new Notification({
            title: NotificationHelper.joinNotificationTitle(),
            body: NotificationHelper.rejectRequestBody(event),
            eventId: event.id,
            user: toUser,
            avatarUrl: fromUser.picture,
            createdUser: event.owner,
            createdDate: (new Date()).toUTCString(),
            notificationType: NotificationType.RejectJoin,
            status: NotificationStatus.NotRead,
        });
    }

    static joinNotificationBody(event: Event, user: User): string {
        return `${user.firstName} ${user.lastName} doreste sa se alature evenimentului creat de tine - ${event.title}`;
    }

    static joinNotificationTitle() {
        return 'Cerere de alaturare';
    }

    static approveRequestBody(event: Event): string {
        return `Cererea ta de alaturare la evenimentul: ${event.title} a fost aprobata. Te asteptam!`;
    }

    static rejectRequestBody(event: Event): string {
        return `Cererea ta de alaturare la evenimentul: ${event.title} a fost respinsa. Ne pare rau!`;
    }

    static sendNotification(notification: any, tokens: string[]): Observable<boolean> {
        if (tokens && tokens.length > 0) {
            return from(SendNotification(tokens, notification.body, notification.title));
        } else {
            return of(false);
        }
    }
}
