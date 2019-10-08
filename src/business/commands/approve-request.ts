import { IApproveRequest } from './i-approve-request';
import { Observable, zip, from } from 'rxjs';
import { INotificationRepository } from '../repositories/i-notification-repository';
import { map, flatMap } from 'rxjs/operators';
import { NotificationHelper } from '../../utilities/notification-helper';
import { IUserEventsRepository } from '../repositories/i-user-events-repository';
import { INotificationTokenRepository } from '../repositories/i-notification-token-repository';
import { NotificationType } from '../../data/enums/notification-type';
import { Notification } from '../../data/entities/notification';
import { NotificationStatus } from '../../data/enums/notification-status';
import { UserEventsStatus } from '../../data/enums/user-events-status';

export class ApproveRequest implements IApproveRequest {

    constructor(private readonly notificationRepository: INotificationRepository,
                private readonly notificationTokenRepository: INotificationTokenRepository,
                private readonly userEventsRepository: IUserEventsRepository) { }

    execute(input: string): Observable<boolean> {

        const updateUserEventFlow = this.notificationRepository.getById(input)
            .pipe(flatMap((notification) =>
                this.userEventsRepository.update(notification.eventId,
                    notification.createdUser,
                    UserEventsStatus.Approved)));

        const approveFlow = from(Notification.findOneOrFail({ id: input }))
            .pipe(flatMap((entity) => {
                entity.status = NotificationStatus.Read;
                entity.title = NotificationHelper.userApprovedTitle;
                entity.notificationType = NotificationType.ApproveJoin;
                return entity.save();
            }))
            .pipe(flatMap((notification) =>
                this.notificationRepository.approve(notification.eventId, notification.createdUser)));

        const notificationTokenFlow = this.notificationRepository.getById(input)
            .pipe(flatMap((notification) => this.notificationTokenRepository.get(notification.createdUser)))
            .pipe(map((tokens) => tokens.map((token) => token.token)));

        return zip(updateUserEventFlow, approveFlow, notificationTokenFlow)
            .pipe(flatMap((result) => NotificationHelper.sendNotification(result[1], result[2])));
    }
}
