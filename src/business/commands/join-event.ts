import { Observable, zip, from, iif, throwError } from 'rxjs';
import { IJoinEvent } from './i-join-event';
import { INotificationRepository } from '../repositories/i-notification-repository';
import { UserContext } from '../../utilities/user-context';
import { IUserEventsRepository } from '../repositories/i-user-events-repository';
import { INotificationTokenRepository } from '../repositories/i-notification-token-repository';
import { flatMap, map } from 'rxjs/operators';
import { UserEventsInput } from '../models/inputs/user-events-input';
import { NotificationHelper } from '../../utilities/notification-helper';
import { IEventRepository } from '../repositories/i-event-repository';
import { UserEventsStatus } from '../../data/enums/user-events-status';
import { Errors } from '../../utilities/errors';

export class JoinEvent implements IJoinEvent {

    constructor(private readonly notificationRepository: INotificationRepository,
                private readonly notificationTokenRepository: INotificationTokenRepository,
                private readonly eventRepository: IEventRepository,
                private readonly userEventsRepository: IUserEventsRepository,
                private readonly userContext: UserContext) {
    }

    execute(eventId: string): Observable<boolean> {
        return this.allSpotsOccupied(eventId)
            .pipe(flatMap((result) => iif(() => result === true,
                throwError(new Error(Errors.AllSpotsOccupied)),
                this.joinUser(eventId))));
    }

    private joinUser(eventId: string) {
        const userEvent = new UserEventsInput({
            eventId,
            userId: this.userContext.userId,
            status: UserEventsStatus.Pending,
        });
        const userEventFlow = this.userEventsRepository.insert(userEvent);
        const notificationFlow = this.notificationRepository.joinEvent(eventId);
        const notificationTokenFlow = this.eventRepository.getById(eventId)
            .pipe(flatMap((event) => this.notificationTokenRepository.get(event.owner.id)))
            .pipe(map((tokens) => tokens.map((token) => token.token)));
        return zip(userEventFlow, notificationFlow, notificationTokenFlow)
            .pipe(flatMap((result) => NotificationHelper.sendNotification(result[1], result[2], eventId)));
    }

    private allSpotsOccupied(eventId: string): Observable<boolean> {
        const numberOfParticipantsFlow = this.eventRepository.getById(eventId)
            .pipe(map((event) => event.freeSpots));
        const spotsOccupiesFlow = this.userEventsRepository.approvedSpots(eventId);

        return zip(numberOfParticipantsFlow, spotsOccupiesFlow)
            .pipe(map((result) => result[0] === result[1]));

    }
}
