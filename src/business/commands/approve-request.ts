import { IApproveRequest } from './i-approve-request';
import { Observable, zip } from 'rxjs';
import { INotificationRepository } from '../repositories/i-notification-repository';
import { NotificationStatus } from '../../data/enums/notification-status';
import { map, flatMap } from 'rxjs/operators';
import { NotificationHelper } from '../../utilities/notification-helper';
import { IUserEventsRepository } from '../repositories/i-user-events-repository';
import { INotificationTokenRepository } from '../repositories/i-notification-token-repository';

export class ApproveRequest implements IApproveRequest {

    constructor(private readonly notificationRepository: INotificationRepository,
                private readonly notificationTokenRepository: INotificationTokenRepository,
                private readonly userEventsRepository: IUserEventsRepository) { }

    execute(input: string): Observable<boolean> {

        const updateUserEventFlow = this.notificationRepository.getById(input)
            .pipe(map((notification) =>
                this.userEventsRepository.update(notification.eventId,
                    notification.userId,
                    NotificationStatus.Approved)));

        const approveFlow = this.notificationRepository.update(input, NotificationStatus.Approved)
            .pipe(map((notification) => this.notificationRepository.approve(notification.eventId, notification.userId)));

        const notificationTokenFlow = this.notificationRepository.getById(input)
            .pipe(map((notification) => this.notificationTokenRepository.get(notification.userId)));

        return  zip(updateUserEventFlow, approveFlow, notificationTokenFlow)
            .pipe(flatMap((result) => NotificationHelper.sendNotification(result[1], result[2])));
    }
}
