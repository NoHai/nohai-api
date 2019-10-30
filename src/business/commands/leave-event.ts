import { Observable, of } from 'rxjs';
import { ILeaveEvent } from './i-leave-event';
import { IUserEventsRepository } from '../repositories/i-user-events-repository';
import { NotificationRepository } from '../../data/repositories/notification-repository';
import { UserContext } from '../../utilities/user-context';
import { flatMap } from 'rxjs/operators';
import { UserRepository } from '../../data/repositories/user-repository';

export class LeaveEvent implements ILeaveEvent {
    constructor(private readonly userEventsRepository: IUserEventsRepository, 
                private readonly notificationRepository: NotificationRepository, 
                private readonly userRepository: UserRepository,
                private readonly userContext: UserContext) {

    }

    execute(parameter: string): Observable<boolean> {
        // const deleteUserEventFlow = this.userEventsRepository.delete(parameter, this.userContext.userId);
        // const userFlow = this.us
        // return 
        //     .pipe(flatMap(() => this.notificationRepository()))
        return of(true);
    }

}
