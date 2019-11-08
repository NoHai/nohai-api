import { Observable, from, zip, of, iif, throwError } from 'rxjs';
import { Event as EventResult } from '../models/results/event';
import { IEventRepository } from '../repositories/i-event-repository';
import { IUpdateEvent } from './i-update-event';
import { map, flatMap, filter, catchError } from 'rxjs/operators';
import { IUserEventsRepository } from '../repositories/i-user-events-repository';
import { NotificationHelper } from '../../utilities/notification-helper';
import { Notification } from '../../data/entities/notification';
import { NotificationToken } from '../models/results/notification-token';
import { INotificationTokenRepository } from '../repositories/i-notification-token-repository';
import { In } from 'typeorm';
import { UserEventsStatus } from '../../data/enums/user-events-status';
import { IUserRepository } from '../repositories/i-user-repository';
import { EmailHelper } from '../../utilities/email-helper';
import { EmailService } from '../../services/email-service';
import { EventInput } from '../models/inputs/event-input';
import { UserContext } from '../../utilities/user-context';
import { Errors } from '../../utilities/errors';

export class UpdateEvent implements IUpdateEvent {
    constructor(private eventRepository: IEventRepository,
                private readonly userEventsRepository: IUserEventsRepository,
                private readonly userRepository: IUserRepository,
                private readonly notificationTokenRepository: INotificationTokenRepository,
                private readonly emailService: EmailService,
                private readonly userContext: UserContext) {
    }

    execute(input: EventInput): Observable<EventResult> {
        if (this.hasEditRights(input)) {
            const updateEventFlow = this.eventRepository.update(input);
            const sendNotificationFlow = this.sendNotifications(input);
            const sendEmails = this.sendEmails(input);

            return zip(updateEventFlow, sendNotificationFlow, sendEmails)
                .pipe(map((result) => {
                    return result[0];
                }));
        } else {
            return throwError(new Error(Errors.RequireAdministratorRights));
        }
    }


    private sendNotifications(event: EventInput): Observable<boolean> {
        const userIdsFlow = this.userEventsRepository.find({ eventId: event.id, status: UserEventsStatus.Approved })
            .pipe(map((userEvents) => userEvents.map((u) => u.userId)));

        const notificationTokenFlow = this.userEventsRepository.find({ eventId: event.id, status: UserEventsStatus.Approved })
            .pipe(map((users) => users.map((u) => u.userId)))
            .pipe(filter((userIds) => userIds && userIds.length > 0))
            .pipe(flatMap((ids) => this.notificationTokenRepository.find({ where: { userId: In(ids) } })));

        return zip(userIdsFlow, notificationTokenFlow)
            .pipe(map((result) => {
                const notifications = NotificationHelper.buildEditEventNotifications(event, result[0]);
                notifications.map((notification) => {
                    const tokens = result[1].filter((n) => n.userId === notification.userId);
                    this.sendNotification(notification, tokens);
                });
                return true;
            }))
            .pipe(catchError(() => of(false)));
    }

    private sendEmails(event: EventInput): Observable<boolean> {
        return this.userEventsRepository.find({ eventId: event.id, status: UserEventsStatus.Approved })
            .pipe(map((userEvents) => userEvents.map((u) => u.userId)))
            .pipe(flatMap((userIds) => this.userRepository.getWithCredentials(userIds)))
            .pipe(flatMap((users) => {
                const emails = EmailHelper.getEditEventEmails(users, event.title);
                return this.emailService.sendMultipleEmails(emails);
            }))
            .pipe(flatMap((emailResult) => iif(() => !!emailResult && emailResult[0].statusCode === 202,
                of(true),
                of(false))));

    }

    private sendNotification(notification: Notification, tokens: NotificationToken[]) {
        return from(notification.save())
            .pipe(flatMap((noti) => NotificationHelper.sendNotification(noti, tokens.map((to) => to.token))));
    }

    private hasEditRights(input: EventInput) {
        return input.owner.id === this.userContext.userId;
    }
}
