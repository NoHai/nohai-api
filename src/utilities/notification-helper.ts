import { User } from '../data/entities/user';
import { Event } from '../data/entities/event';
import { Notification } from '../data/entities/notification';
import { SendNotification } from '../services/send-notification';
import { Observable, from, of } from 'rxjs';
import { NotificationType } from '../data/enums/notification-type';
import { NotificationStatus } from '../data/enums/notification-status';

export class NotificationHelper {
    static joinNotificationTitle: string = 'Cerere de alaturare';
    static approveNotificationTitle: string =  'Cerere aprobata';
    static rejectNotificationTitle: string = 'Cerere respinsa';
    static userApprovedTitle: string = 'Ai aprobat aceasta cerere';
    static userRejectTitle: string = 'Ai respins aceasta cerere';
    static noSpotsAvailableTitle: string = 'S-au epuizat locurile';
    static cancelEventTitle: string = 'Evenimentul a fost anulat';

    static buildJoinNotification(event: any, user: User): Notification {
        return new Notification({
            title: NotificationHelper.joinNotificationTitle,
            body: NotificationHelper.joinNotificationBody(event, user).trim(),
            eventId: event.id,
            userId: event.owner.id,
            avatarUrl: user.picture,
            createdUser: user.id,
            notificationType: NotificationType.JoinRequest,
            status: NotificationStatus.Unread,
        });
    }

    static buildApproveNotification(event: any, fromUser: User, toUser: string): Notification {
        return new Notification({
            title: NotificationHelper.approveNotificationTitle,
            body: NotificationHelper.approveRequestBody(event).trim(),
            eventId: event.id,
            userId: toUser,
            avatarUrl: fromUser.picture,
            createdUser: event.owner.id,
            notificationType: NotificationType.ApproveJoin,
            status: NotificationStatus.Unread,
        });
    }

    static buildRejectNotification(event: any, fromUser: User, toUser: string): Notification {
        return new Notification({
            title: NotificationHelper.rejectNotificationTitle,
            body: NotificationHelper.rejectRequestBody(event).trim(),
            eventId: event.id,
            userId: toUser,
            avatarUrl: fromUser.picture,
            createdUser: event.owner.id,
            notificationType: NotificationType.RejectJoin,
            status: NotificationStatus.Unread,
        });
    }

    static buildLeaveEventNotification(event: any, fromUser: User, toUser: string): Notification {
        return new Notification({
            title: NotificationHelper.rejectNotificationTitle,
            body: NotificationHelper.rejectRequestBody(event),
            eventId: event.id,
            userId: toUser,
            avatarUrl: fromUser.picture,
            createdUser: event.owner.id,
            notificationType: NotificationType.RejectJoin,
            status: NotificationStatus.Unread,
        });
    }

    static joinNotificationBody(event: Event, user: User): string {
        return `${user.firstName} ${user.lastName} doreste sa se alature evenimentului creat de tine - ${event.title}`;
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
