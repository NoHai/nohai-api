import { IRejectRequest } from './i-reject-request';
import { INotificationTokenRepository } from '../repositories/i-notification-token-repository';
import { INotificationRepository } from '../repositories/i-notification-repository';
import { Observable, zip } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { IUserEventsRepository } from '../repositories/i-user-events-repository';
import { NotificationStatus } from '../../data/enums/notification-status';
import { NotificationHelper } from '../../utilities/notification-helper';

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

        const rejectFlow = this.notificationRepository.update(input, NotificationStatus.Rejected)
            .pipe(map((notification) => this.notificationRepository.reject(notification.eventId, notification.userId)));

        const notificationTokenFlow = this.notificationRepository.getById(input)
            .pipe(map((notification) => this.notificationTokenRepository.get(notification.userId)));

        return zip(deleteUserEventFlow, rejectFlow, notificationTokenFlow)
            .pipe(flatMap((result) => NotificationHelper.sendNotification(result[1], result[2])));

    }

}
