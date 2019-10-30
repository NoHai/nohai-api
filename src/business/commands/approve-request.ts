import { IApproveRequest } from './i-approve-request';
import { Observable, zip, from, of, iif, throwError } from 'rxjs';
import { INotificationRepository } from '../repositories/i-notification-repository';
import { map, flatMap, count } from 'rxjs/operators';
import { NotificationHelper } from '../../utilities/notification-helper';
import { IUserEventsRepository } from '../repositories/i-user-events-repository';
import { INotificationTokenRepository } from '../repositories/i-notification-token-repository';
import { NotificationType } from '../../data/enums/notification-type';
import { Notification } from '../../data/entities/notification';
import { NotificationStatus } from '../../data/enums/notification-status';
import { UserEventsStatus } from '../../data/enums/user-events-status';
import { IEventRepository } from '../repositories/i-event-repository';
import { IUserRepository } from '../repositories/i-user-repository';
import { EmailHelper } from '../../utilities/email-helper';
import { EmailService } from '../../services/email-service';
import { UserEventsFactory } from '../../data/factories/user-events-factory';
import { Errors } from '../../utilities/errors';
export class ApproveRequest implements IApproveRequest {

    constructor(private readonly notificationRepository: INotificationRepository,
                private readonly notificationTokenRepository: INotificationTokenRepository,
                private readonly userEventsRepository: IUserEventsRepository,
                private readonly eventRepository: IEventRepository,
                private readonly userRepository: IUserRepository,
                private readonly emailService: EmailService) { }

    execute(input: string): Observable<any> {
        return zip(this.remainingSpots(input), this.requestAlreadySent(input))
            .pipe(flatMap((result) => iif(() => result[1] === true,
                throwError(new Error(Errors.JoinRequestAlreadySent)),
                this.approve(input, result[0]))));
    }

    private approveBySpot(freeSpots: number, notificationId: string): Observable<boolean> {
        if (freeSpots === 1) {
            return this.approveLastUser(notificationId);
        } else {
            return this.approveUser(notificationId);
        }
    }

    private approveLastUser(notificationId: string): Observable<boolean> {
        const approveUser = this.approveUser(notificationId);
        const sendEmailsToPending = this.sendEmailsToPendingUsers(notificationId);
        const rejectRemainingUsers = this.rejectRemainingUsers(notificationId);

        return zip(approveUser, sendEmailsToPending, rejectRemainingUsers)
            .pipe(map((result) => result[0]));
    }

    private sendEmailsToPendingUsers(notificationId: string) {
        const eventFlow = this.notificationRepository.getById(notificationId)
            .pipe(flatMap((notification) => this.eventRepository.getById(notification.eventId)))
            .pipe(map((event) => event.title));

        const userFlow = this.notificationRepository.getById(notificationId)
            .pipe(flatMap((notification) => this.userEventsRepository.getByStatus(notification.eventId, UserEventsStatus.Pending)))
            .pipe(map((userEvents) => userEvents.map((ev) => ev.userId)))
            .pipe(flatMap((userIds) => this.userRepository.getWithCredentials(userIds)));


        return zip(eventFlow, userFlow)
            .pipe(map((result) => EmailHelper.getAllSpotsOccupiedEmails(result[1], result[0])))
            .pipe(flatMap((emails) => this.emailService.sendMultipleEmails(emails)))
            .pipe(flatMap((emailResult) => iif(() => !!emailResult && emailResult[0].statusCode === 202,
                of(true),
                of(false))));

    }

    private rejectRemainingUsers(notificationId: string) {
        const updateNotifications = this.notificationRepository.getById(notificationId)
            .pipe(flatMap((notification) => this.userEventsRepository.find({
                eventId: notification.eventId,
                status: UserEventsStatus.Pending,
            })))
            .pipe(map((userEvents) => UserEventsFactory.results.fromUserEventResultsLight(userEvents)))
            .pipe(map((paremeters) => this.notificationRepository.rejectAll({ where: paremeters })));

        const deleteUserEvents = this.notificationRepository.getById(notificationId)
            .pipe(map((notification) => this.userEventsRepository.delete({ eventId: notification.eventId,
                                                                        status: UserEventsStatus.Pending})));

        return zip(updateNotifications, deleteUserEvents)
            .pipe(map((result) => result[0]));
    }

    private approveUser(input: string) {
        const updateUserEventFlow = this.notificationRepository.getById(input)
            .pipe(flatMap((notification) => this.userEventsRepository.update(notification.eventId,
                notification.createdUser,
                UserEventsStatus.Approved)));

        const approveFlow = from(Notification.findOneOrFail({ id: input }))
            .pipe(flatMap((entity) => {
                entity.status = NotificationStatus.Read;
                entity.title = NotificationHelper.userApprovedTitle;
                entity.notificationType = NotificationType.ApproveJoin;
                return entity.save();
            }))
            .pipe(flatMap((notification) => this.notificationRepository.approve(notification.eventId, notification.createdUser)));

        const notificationTokenFlow = this.notificationRepository.getById(input)
            .pipe(flatMap((notification) => this.notificationTokenRepository.get(notification.createdUser)))
            .pipe(map((tokens) => tokens.map((token) => token.token)));

        return zip(updateUserEventFlow, approveFlow, notificationTokenFlow)
            .pipe(flatMap((result) => {
                NotificationHelper.sendNotification(result[1], result[2]);
                return of(true);
            }));
    }

    private rejectUser(notificationId: string) {

        return from(Notification.findOneOrFail({ id: notificationId }))
            .pipe(flatMap((entity) => {
                entity.status = NotificationStatus.Read;
                entity.title = NotificationHelper.noSpotsAvailableTitle;
                entity.notificationType = NotificationType.RejectJoin;
                return entity.save();
            }))
            .pipe(flatMap(() => {
                throwError(new Error(Errors.AllSpotsOccupied));
                return of(false);
            }));

    }

    private remainingSpots(notificationId: string): Observable<number> {
        const approvedSpots = this.notificationRepository.getById(notificationId)
            .pipe(flatMap((notification) => this.userEventsRepository.approvedSpots(notification.eventId)));

        const freeSpots = this.notificationRepository.getById(notificationId)
            .pipe(flatMap((notification) => this.eventRepository.getById(notification.eventId)))
            .pipe(map((event) => event.freeSpots));

        return zip(approvedSpots, freeSpots)
            .pipe(flatMap((result) => iif(() => result[1] === null
                                        , of(999)
                                        , of(result[1] - result[0]))));
    }

    private requestAlreadySent(notificationId: string): Observable<boolean> {
        return this.notificationRepository.getById(notificationId)
                .pipe(flatMap((notification) =>
                    this.userEventsRepository.find({ userId: notification.createdUser,
                    eventId: notification.eventId,
                    status: UserEventsStatus.Approved})))
                .pipe(flatMap((results) => iif(() => results && results.length > 0,
                    of(true),
                    of(false))));
    }

    private approve(input: string, remainingSpots: number): Observable<boolean> {
        if (remainingSpots === 0) {
           return this.rejectUser(input);
        } else {
           return  this.approveBySpot(remainingSpots, input);
        }
    }
}
