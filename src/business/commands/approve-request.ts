import { IApproveRequest } from './i-approve-request';
import { Observable, zip, from, of, iif, throwError } from 'rxjs';
import { INotificationRepository } from '../repositories/i-notification-repository';
import { map, flatMap } from 'rxjs/operators';
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

        return this.remainingSpots(input)
            .pipe(map((result) => {
                if (result === 1) {
                    return this.approveLastUser(input);
                } else if (result > 1) {
                    return this.approveUser(input);
                } else {
                    return throwError(Errors.AllSpotsOccupied);
                }
            }));
    }

    private approveLastUser(notificationId: string) {
        const approveUser = this.approveUser(notificationId);
        const sendEmailsToPending = this.sendEmailsToPendingUsers(notificationId);
        const rejectRemainingUsers = this.rejectRemainingUsers(notificationId);

        return zip(approveUser, sendEmailsToPending, this.rejectRemainingUsers, rejectRemainingUsers)
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
            .pipe(flatMap((emailResult) => iif(() => emailResult[0].statusCode === 202,
                of(true),
                of(false))));

    }

    private rejectRemainingUsers(notificationId: string) {
        const updateNotifications = this.notificationRepository.getById(notificationId)
            .pipe(flatMap((notification) => this.userEventsRepository.find({
                eventId: notification.eventId,
                status: UserEventsStatus.Pending
            })))
            .pipe(map((userEvents) => UserEventsFactory.results.fromUserEventResultsLight(userEvents)))
            .pipe(map((paremeters) => this.notificationRepository.rejectAll({ where: paremeters })));

        const deleteUserEvents = this.notificationRepository.getById(notificationId)
            .pipe(map((notification) => this.userEventsRepository.deleteByStatus(notification.eventId, UserEventsStatus.Pending)));

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
            .pipe(flatMap((result) => NotificationHelper.sendNotification(result[1], result[2])));
    }

    private remainingSpots(notificationId: string): Observable<number> {
        const approvedSpots = this.notificationRepository.getById(notificationId)
            .pipe(flatMap((notification) => this.userEventsRepository.approvedSpots(notification.eventId)));

        const freeSpots = this.notificationRepository.getById(notificationId)
            .pipe(flatMap((notification) => this.eventRepository.getById(notification.eventId)))
            .pipe(map((event) => event.freeSpots));

        return zip(approvedSpots, freeSpots)
            .pipe(map((result) => result[1] - result[0]));
    }
}
