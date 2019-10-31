import { Observable, of, zip, iif, from } from 'rxjs';
import { ILeaveEvent } from './i-leave-event';
import { IUserEventsRepository } from '../repositories/i-user-events-repository';
import { UserContext } from '../../utilities/user-context';
import { flatMap, map } from 'rxjs/operators';
import { UserRepository } from '../../data/repositories/user-repository';
import { EventRepository } from '../../data/repositories/event-repository';
import { NotificationHelper } from '../../utilities/notification-helper';
import { NotificationTokenRepository } from '../../data/repositories/notification-token-repository';
import { EmailHelper } from '../../utilities/email-helper';
import { EmailService } from '../../services/email-service';

export class LeaveEvent implements ILeaveEvent {
    constructor(private readonly userEventsRepository: IUserEventsRepository,
                private readonly notificationTokenRepository: NotificationTokenRepository,
                private readonly eventRepository: EventRepository,
                private readonly userRepository: UserRepository,
                private readonly userContext: UserContext,
                private readonly emailService: EmailService) {
    }

    execute(parameter: string): Observable<boolean> {
        const deleteUserEventFlow = this.userEventsRepository.delete({ eventId: parameter, userId: this.userContext.userId });
        const userFlow = this.userRepository.getById(this.userContext.userId);
        const eventFlow = this.eventRepository.getById(parameter);
        const tokensFlow = this.eventRepository.getById(parameter)
            .pipe(flatMap((event) => this.notificationTokenRepository.get(event.owner.id)))
            .pipe(map((notTokens) => notTokens.map((token) => token.token)));

        return zip(deleteUserEventFlow, userFlow, eventFlow, tokensFlow)
            .pipe(flatMap((result) => {
                this.sendEmails(result[2].owner, result[1], result[2].title);
                return this.sendNotification(result[2], result[1], result[3]);
            }));

    }

    private sendNotification(event: any, user: any, tokens: any) {
        const notification = NotificationHelper.buildLeaveEventNotification(event, user);
        notification.save();
        return NotificationHelper.sendNotification(notification, tokens);
    }

    private sendEmails(user: any, leaveUser: any, eventTitle: string) {
        const email = EmailHelper.getLeaveEventEmail(user, leaveUser, eventTitle);
        return from(this.emailService.sendEmail(email))
            .pipe(flatMap((emailResult) => iif(() => !!emailResult && emailResult[0].statusCode === 202,
                of(true),
                of(false))));
    }
}
