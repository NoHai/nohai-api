import { Observable, zip, from } from 'rxjs';
import { IJoinEvent } from './i-join-event';
import { INotificationRepository } from '../repositories/i-notification-repository';
import { UserContext } from '../../utilities/user-context';
import { IUserEventsRepository } from '../repositories/i-user-events-repository';
import { INotificationTokenRepository } from '../repositories/i-notification-token-repository';
import { flatMap, map } from 'rxjs/operators';
import { UserEventsInput } from '../models/inputs/user-events-input';
import { NotificationHelper } from '../../utilities/notification-helper';
import { IEventRepository } from '../repositories/i-event-repository';
import { NotificationType } from '../../data/enums/notification-type';

export class JoinEvent implements IJoinEvent {

    constructor(private readonly notificationRepository: INotificationRepository,
                private readonly notificationTokenRepository: INotificationTokenRepository,
                private readonly eventRepository: IEventRepository,
                private readonly userEventsRepository: IUserEventsRepository,
                private readonly userContext: UserContext) {
    }

    execute(eventId: string): Observable<boolean> {

        const userEvent = new UserEventsInput({
            eventId,
            userId: this.userContext.userId,
            status: NotificationType.JoinRequest,
        });
        const userEventFlow = this.userEventsRepository.insert(userEvent);
        const notificationFlow = this.notificationRepository.joinEvent(eventId);
        const notificationTokenFlow = this.eventRepository.getById(eventId)
                                    .pipe(map((event) => this.notificationTokenRepository.get(event.owner)));

        return  zip(userEventFlow, notificationFlow, notificationTokenFlow)
            .pipe(flatMap((result) => NotificationHelper.sendNotification(result[1], result[2])));
    }
}
