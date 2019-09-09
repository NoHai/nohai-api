import { Observable, zip, from, pipe, of } from 'rxjs';
import { IJoinEvent } from './i-join-event';
import { UserEvents } from '../models/results/user-events';
import { INotificationRepository } from '../repositories/i-notification-repository';
import { UserContext } from '../../utilities/user-context';
import { IUserEventsRepository } from '../repositories/i-user-events-repository';
import { INotificationTokenRepository } from '../repositories/i-notification-token-repository';
import { flatMap } from 'rxjs/operators';
import { SendNotification } from '../../services/send-notification';
import { Nothing } from '../models/nothing';
import { UserEventsInput } from '../models/inputs/user-events-input';

export class JoinEvent implements IJoinEvent {

    constructor(private readonly notificationRepository: INotificationRepository,
                private readonly notificationTokenRepository: INotificationTokenRepository,
                private readonly userEventsRepository: IUserEventsRepository,
                private readonly userContext: UserContext) {
    }

    execute(eventId: string): Observable<Nothing> {

        const userEvent = new UserEventsInput({
            eventId,
            userId: this.userContext.userId,
        });
        const userEventFlow = this.userEventsRepository.insert(userEvent);
        const notificationFlow = this.notificationRepository.joinEvent(eventId);
        const notificationTokenFlow = this.notificationTokenRepository.getFromEventOwner(eventId);

        return  zip(userEventFlow, notificationFlow, notificationTokenFlow)
            .pipe(flatMap((result) => this.sendNotification(result[1], result[2])));


    }

    private sendNotification(notification: any, tokens: any): Observable<Nothing> {
        return  from(SendNotification(tokens, notification.body, notification.title))
                .pipe(() => of(Nothing));

    }
}
