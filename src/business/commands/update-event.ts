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
            const hasParticipants = this.hasParticipants(input.id);

            return zip(updateEventFlow, hasParticipants)
                .pipe(flatMap((result) => iif(() => result[1],
                    this.notifyUsers(result[0]),
                    of(result[0]))));
        } else {
            return throwError(new Error(Errors.RequireAdministratorRights));
        }
    }

    private notifyUsers(event: EventResult): Observable<EventResult> {
        return this.sendNotifications(event.id)
            .pipe(map((eventRes) => {
                 this.sendEmails(eventRes);
                 return eventRes;
            }));
    }


    private sendNotifications(eventId: string): Observable<EventResult> {
        const userIdsFlow = this.userEventsRepository.find({ eventId, status: UserEventsStatus.Approved })
            .pipe(map((userEvents) => userEvents.map((u) => u.userId)));

        const notificationTokenFlow = this.userEventsRepository.find({ eventId, status: UserEventsStatus.Approved })
            .pipe(map((users) => users.map((u) => u.userId)))
            .pipe(filter((userIds) => userIds && userIds.length > 0))
            .pipe(flatMap((ids) => this.notificationTokenRepository.find({ where: { userId: In(ids) } })));

        const eventFlow = this.eventRepository.getById(eventId);

        return zip(userIdsFlow, notificationTokenFlow, eventFlow)
            .pipe(map((result) => {
                if (result[1] && result[1].length > 0) {
                    const notifications = NotificationHelper.buildEditEventNotifications(result[2], result[0]);
                    notifications.map((notification) => {
                        const tokens = result[1].filter((n) => n.userId === notification.userId);
                        this.sendNotification(notification, tokens);
                    });
                    return result[2];
                } else {
                    return result[2];
                }
            }));
    }

    private sendEmails(event: EventResult): Observable<boolean> {
        return this.userEventsRepository.find({ eventId: event.id, status: UserEventsStatus.Approved })
            .pipe(map((userEvents) => userEvents.map((u) => u.userId)))
            .pipe(filter((userIds) => userIds && userIds.length > 0))
            .pipe(flatMap((ids) => this.userRepository.getWithCredentials(ids)))
            .pipe(flatMap((users) => {
                const emails = EmailHelper.getEditEventEmails(users, event.title);
                return this.emailService.sendMultipleEmails(emails);
            }))
            .pipe(flatMap((emailResult) => iif(() => !!emailResult && emailResult[0].statusCode === 202,
                of(true),
                of(false))))
            .pipe(catchError((erro) => {
                return of(false);
            }));

    }

    private sendNotification(notification: Notification, tokens: NotificationToken[]) {
        return from(notification.save())
            .pipe(flatMap((noti) => NotificationHelper.sendNotification(noti, tokens.map((to) => to.token))));
    }

    private hasEditRights(input: EventInput) {
        return input.owner.id === this.userContext.userId;
    }

    private hasParticipants(eventId: string | undefined): Observable<boolean> {
        return this.userEventsRepository.find({ eventId, status: UserEventsStatus.Approved })
            .pipe(flatMap((userEvents) => iif(() => userEvents && userEvents.length > 0, of(true), of(false))))
            .pipe(catchError(() => of(false)));
    }
}
