import { IEventRepository } from '../repositories/i-event-repository';
import { UserContext } from '../../utilities/user-context';
import { of, Observable, iif, zip, from } from 'rxjs';
import { ICancelEvent } from './i-cancel-event';
import { map, flatMap, tap, count, catchError, filter } from 'rxjs/operators';
import { IUserEventsRepository } from '../repositories/i-user-events-repository';
import { NotificationHelper } from '../../utilities/notification-helper';
import { INotificationTokenRepository } from '../repositories/i-notification-token-repository';
import { Notification } from '../../data/entities/notification';
import { In } from 'typeorm';
import { NotificationToken } from '../models/results/notification-token';
import { IUserRepository } from '../repositories/i-user-repository';
import { EmailHelper } from '../../utilities/email-helper';
import { EmailService } from '../../services/email-service';
import { INotificationRepository } from '../repositories/i-notification-repository';

export class CancelEvent implements ICancelEvent {
    constructor(private readonly eventRepository: IEventRepository,
                private readonly userEventsRepository: IUserEventsRepository,
                private readonly userRepository: IUserRepository,
                private readonly notificationTokenRepository: INotificationTokenRepository,
                private readonly notificationRepository: INotificationRepository,
                private readonly userContext: UserContext,
                private readonly emailService: EmailService) {
    }

    execute(id: string): Observable<boolean> {
        return this.eventRepository.getById(id)
                        .pipe(flatMap((event) => iif(() => event.owner.id  === this.userContext.userId,
                        this.cancelEvent(id),
                        of(false))));
    }

    private cancelEvent(id: string): Observable<boolean> {
        return this.hasParticpants(id)
            .pipe(flatMap((hasParticpants) => iif(() => hasParticpants === false,
                                    this.deleteEventRelated(id),
                                    this.notifyUsersAndDeleteEvent(id))));
    }

    private hasParticpants(eventId: string): Observable<boolean> {
        return this.userEventsRepository.find({ eventId})
            .pipe(flatMap((participants) => iif(() => participants !== undefined && participants.length > 0,
                                                    of(true),
                                                    of(false))))
            .pipe(tap(console.log));
    }

    private sendNotification(notification: Notification, tokens: NotificationToken[]) {
        return from(notification.save())
            .pipe(map((noti) => NotificationHelper.sendNotification(noti, tokens.map((to) => to.token))));
    }

    private deleteEventRelated(id: string) {
        return this.userEventsRepository.delete({ eventId: id})
            .pipe(flatMap(() => this.eventRepository.delete(id)))
            .pipe(flatMap((rowsAffected) => iif(() => rowsAffected !== undefined, of(true), of(false))));
    }

    private notifyUsersAndDeleteEvent(id: string) {
        const userEventsFlow = this.userEventsRepository.find({ eventId: id})
            .pipe(map((users) => users.map((u) => u.userId)));

        const usersFlow = this.userEventsRepository.find({ eventId: id})
                .pipe(map((userEvents) =>  userEvents.map((u) => u.userId)))
                .pipe(flatMap((ids) => this.userRepository.getWithCredentials(ids)));

        const eventFlow = this.eventRepository.getById(id);

        const notificationTokenFlow = this.userEventsRepository.find({ eventId: id})
                .pipe(map((users) => users.map((u) => u.userId)))
                .pipe(flatMap((ids) =>  this.notificationTokenRepository.find({ where: { userId: In(ids)} })));


        const sendNotificationsFlow = zip(userEventsFlow, eventFlow, notificationTokenFlow)
                                    .pipe(map((result) => {
                                        const notifications = NotificationHelper.buildCancelEventNotifications(result[1], result[0]);
                                        notifications.map((notification) => this.sendNotification(notification,
                                                        result[2].filter( (n) => n.userId === notification.userId)));
                                        }))
                                    .pipe(catchError((error) => {
                                        console.log(error);
                                        return of(false);
                                    }))
                                    .pipe(map(() => true));

        const sendEmailsFlow =  zip(eventFlow, usersFlow)
                                .pipe(map((result) => EmailHelper.getCancelEventEmails(result[1], result[0].title)))
                                .pipe(flatMap((emails) => this.emailService.sendMultipleEmails(emails)))
                                .pipe(flatMap((emailResult) => iif(() => !!emailResult && emailResult[0].statusCode === 202,
                                    of(true),
                                    of(false))));

        return   this.notificationRepository.delete({ eventId: id})
                                    .pipe(flatMap(() => sendNotificationsFlow))
                                    .pipe(flatMap(() => sendEmailsFlow))
                                    .pipe(flatMap(() => this.deleteEventRelated(id)));
    }
}
