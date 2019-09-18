import { IApproveRequest } from './i-approve-request';
import { Observable, zip } from 'rxjs';
import { INotificationRepository } from '../repositories/i-notification-repository';
import { map, flatMap } from 'rxjs/operators';
import { NotificationHelper } from '../../utilities/notification-helper';
import { IUserEventsRepository } from '../repositories/i-user-events-repository';
import { INotificationTokenRepository } from '../repositories/i-notification-token-repository';
import { NotificationType } from '../../data/enums/notification-type';

export class ApproveRequest implements IApproveRequest {

    constructor(private readonly notificationRepository: INotificationRepository,
                private readonly notificationTokenRepository: INotificationTokenRepository,
                private readonly userEventsRepository: IUserEventsRepository) { }

    execute(input: string): Observable<boolean> {

        const updateUserEventFlow = this.notificationRepository.getById(input)
            .pipe(map((notification) =>
                this.userEventsRepository.update(notification.eventId,
                    notification.userId,
                    NotificationType.ApproveJoin)));

        const approveFlow = this.notificationRepository.markAsRead(input)
            .pipe(map((notification) => this.notificationRepository.approve(notification.eventId, notification.userId)));

        const notificationTokenFlow = this.notificationRepository.getById(input)
            .pipe(flatMap((notification) => this.notificationTokenRepository.get(notification.userId)))
            .pipe(map((tokens) => tokens.map((token) => token.token)));

        return  zip(updateUserEventFlow, approveFlow, notificationTokenFlow)
            .pipe(flatMap((result) => NotificationHelper.sendNotification(result[1], result[2])));
    }
}
