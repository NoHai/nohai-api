import { ICancelPendingRequest } from './i-cancel-pending-request';
import { Observable, iif, of } from 'rxjs';
import { INotificationRepository } from '../repositories/i-notification-repository';
import { IUserEventsRepository } from '../repositories/i-user-events-repository';
import { UserContext } from '../../utilities/user-context';
import { NotificationType } from '../../data/enums/notification-type';
import { flatMap, catchError } from 'rxjs/operators';

export class CancelPendingRequest implements ICancelPendingRequest {

    constructor(private readonly notificationRepository: INotificationRepository,
                private readonly userEventsRepository: IUserEventsRepository,
                private readonly userContext: UserContext) {

    }

    execute(parameter: string): Observable<boolean> {
        return this.notificationRepository.delete({
            eventId: parameter,
            userId: this.userContext.userId,
            type: NotificationType.JoinRequest,
        })
            .pipe(flatMap(() => this.userEventsRepository.delete({ eventId: parameter, userId: this.userContext.userId })))
            .pipe(flatMap((deleteResult) => iif(() => deleteResult !== undefined && deleteResult > 0, of(true), of(false))))
            .pipe(catchError(() => of(false)));
    }
}
