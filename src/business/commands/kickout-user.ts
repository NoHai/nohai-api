import { Observable, of, zip, iif, from } from 'rxjs';
import { IUserEventsRepository } from '../repositories/i-user-events-repository';
import { UserContext } from '../../utilities/user-context';
import { flatMap, map, catchError } from 'rxjs/operators';
import { UserRepository } from '../../data/repositories/user-repository';
import { EventRepository } from '../../data/repositories/event-repository';
import { NotificationHelper } from '../../utilities/notification-helper';
import { NotificationTokenRepository } from '../../data/repositories/notification-token-repository';
import { EmailHelper } from '../../utilities/email-helper';
import { EmailService } from '../../services/email-service';
import { IKickoutUser } from './i-kickout-user';

export class KickoutUser implements IKickoutUser {
    constructor(private readonly userEventsRepository: IUserEventsRepository,
                private readonly notificationTokenRepository: NotificationTokenRepository,
                private readonly eventRepository: EventRepository,
                private readonly userRepository: UserRepository,
                private readonly userContext: UserContext,
                private readonly emailService: EmailService) {
    }

    execute(parameter: any): Observable<boolean> {
      return this.checkIfUserHasRights(parameter.eventId)
        .pipe(flatMap((hasRights) => iif(() => hasRights === true,
            this.removeUserFromEvent(parameter.eventId, parameter.userId),
            of(false))));

    }

    private sendNotification(event: any, user: any, tokens: any) {
        const notification = NotificationHelper.buildLeaveEventNotification(event, user);
        notification.save();
        return NotificationHelper.sendNotification(notification, tokens);
    }

    private sendEmails(kickoutUser: any, eventTitle: string) {
        const email = EmailHelper.getKickoutUserEmail(kickoutUser, eventTitle);
        return from(this.emailService.sendEmail(email))
            .pipe(flatMap((emailResult) => iif(() => !!emailResult && emailResult[0].statusCode === 202,
                of(true),
                of(false))));
    }

    private removeUserFromEvent(eventId: string, userId: string) {
        console.log('remove from event');
        console.log(eventId);
        console.log(userId);
        const deleteUserEventFlow = this.userEventsRepository.delete({ eventId, userId });
        const userFlow = this.userRepository.getById(userId);
        const eventFlow = this.eventRepository.getById(eventId);
        const tokensFlow = this.notificationTokenRepository.get(userId)
                    .pipe(map((notTokens) => notTokens.map((token) => token.token)));

        return zip(deleteUserEventFlow, userFlow, eventFlow, tokensFlow)
            .pipe(flatMap((result) => {
                this.sendEmails(result[1], result[2].title);
                return this.sendNotification(result[2], result[1], result[3]);
            }))
            .pipe(catchError(() => of(false)))
            .pipe(flatMap(() => of(true)));
    }

    private checkIfUserHasRights(eventId: string) {
        return this.eventRepository.getById(eventId)
            .pipe(flatMap((event) => iif(() => event.owner.id === this.userContext.userId, of(true), of(false))));
    }
}
