import { Observable, of, zip } from 'rxjs';
import { EventInput } from '../models/inputs/event-input';
import { Event as EventResult } from '../models/results/event';
import { IEventRepository } from '../repositories/i-event-repository';
import { ICreateEvent } from './i-create-event';
import { INotificationTokenRepository } from '../repositories/i-notification-token-repository';
import { IUserRepository } from '../repositories/i-user-repository';
import { flatMap, catchError } from 'rxjs/operators';
import { UserContext } from '../../utilities/user-context';
import { NotificationHelper } from '../../utilities/notification-helper';
import { In } from 'typeorm';

export class CreateEvent implements ICreateEvent {
    constructor(private eventRepository: IEventRepository,
                private notificationTokenRepository: INotificationTokenRepository,
                private userRepository: IUserRepository,
                private userContext: UserContext) {
    }

    execute(input: EventInput): Observable<any> {
        const userIdsFlow = this.userRepository.find({ favoriteSport: input.sport.id })
            .pipe(flatMap((users) => users !== undefined
                ? of(users.map((user) => user.id).filter((id) => id !== this.userContext.userId))
                : of(users)));
        const insertFlow = this.eventRepository.insert(input);

        return zip(insertFlow, userIdsFlow)
            .pipe(flatMap((result) => this.sendNotificationsToUsers(result[0], result[1] === undefined ? [] : result[1])));
    }

    private sendNotificationsToUsers(event: EventResult, userIds: string[]) {
        if (userIds && userIds.length > 0) {
            const filterdIds = userIds.filter((id) => id !== this.userContext.userId);
            const eventFlow = this.eventRepository.getById(event.id);
            const notificationTokenFlow = this.notificationTokenRepository.find({ where: { userId: In(filterdIds) } });

            return zip(eventFlow, notificationTokenFlow)
                .pipe(flatMap((result) => {
                    const notifications = NotificationHelper.buildCreateEventNotifications(result[0], filterdIds);
                    notifications.map((notification) => {
                        const tokens = result[1] !== undefined ? result[1].filter((n) => n.userId === notification.userId) : [];
                        notification.save();
                        NotificationHelper.sendNotification(notification, tokens.map((to) => to.token));
                    });
                    return of(result[0]);
                }))
                .pipe(catchError(() => {
                    return of(event);
                }));
        } else {
            return of(event);
        }
    }
}
