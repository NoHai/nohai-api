import { IRejectRequest } from './i-reject-request';
import { INotificationTokenRepository } from '../repositories/i-notification-token-repository';
import { INotificationRepository } from '../repositories/i-notification-repository';
import { Observable, zip, from } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { IUserEventsRepository } from '../repositories/i-user-events-repository';
import { NotificationStatus } from '../../data/enums/notification-status';
import { NotificationHelper } from '../../utilities/notification-helper';
import { Notification } from '../../data/entities/notification';

export class RejectRequest implements IRejectRequest {
    constructor(
        private readonly notificationTokenRepository: INotificationTokenRepository,
        private readonly notificationRepository: INotificationRepository,
        private readonly userEventsRepository: IUserEventsRepository,
    ) { }

    execute(input: string): Observable<boolean> {
        const deleteUserEventFlow = this.notificationRepository.getById(input)
            .pipe(map((notification) =>
                this.userEventsRepository.delete(notification.eventId,
                    notification.userId)));

        const rejectFlow = from(Notification.findOneOrFail({ id: input }))
                            .pipe(flatMap((entity) => {
                                entity.status = NotificationStatus.Read;
                                entity.title = NotificationHelper.userApprovedTitle;
                                return entity.save();
                            }))
                            .pipe(map((notification) => this.notificationRepository.reject(notification.eventId, notification.user)));

        this.notificationRepository.markAsRead(input)
            .pipe(map((notification) => this.notificationRepository.reject(notification.eventId, notification.userId)));

        const notificationTokenFlow = this.notificationRepository.getById(input)
            .pipe(flatMap((notification) => this.notificationTokenRepository.get(notification.userId)))
            .pipe(map((tokens) => tokens.map((token) => token.token)));

        return zip(deleteUserEventFlow, rejectFlow, notificationTokenFlow)
            .pipe(flatMap((result) => NotificationHelper.sendNotification(result[1], result[2])));

    }

}
