import { ICancelPendingRequest } from './i-cancel-pending-request';
import { Observable, iif, of } from 'rxjs';
import { INotificationRepository } from '../repositories/i-notification-repository';
import { IUserEventsRepository } from '../repositories/i-user-events-repository';
import { UserContext } from '../../utilities/user-context';
import { flatMap, catchError } from 'rxjs/operators';
import { IEventRepository } from '../repositories/i-event-repository';

export class CancelPendingRequest implements ICancelPendingRequest {

    constructor(private readonly notificationRepository: INotificationRepository,
                private readonly eventRepository: IEventRepository,
                private readonly userEventsRepository: IUserEventsRepository,
                private readonly userContext: UserContext) {

    }

    execute(parameter: string): Observable<boolean> {
        return this.eventRepository.getById(parameter)
            .pipe(flatMap((event) => this.notificationRepository.delete({
                eventId: parameter,
                userId: event.owner.id,
                createdUser: this.userContext.userId,
            })))
            .pipe(flatMap(() => this.userEventsRepository.delete({ eventId: parameter, userId: this.userContext.userId })))
            .pipe(flatMap((deleteResult) => iif(() => deleteResult !== undefined && deleteResult > 0, of(true), of(false))))
            .pipe(catchError(() => of(false)));
    }
}
