import { Observable, of, pipe, zip, from } from 'rxjs';
import { EventInput } from '../models/inputs/event-input';
import { Event as EventResult } from '../models/results/event';
import { IEventRepository } from '../repositories/i-event-repository';
import { ICreateEvent } from './i-create-event';
import { INotificationRepository } from '../repositories/i-notification-repository';
import { INotificationTokenRepository } from '../repositories/i-notification-token-repository';
import { IUserRepository } from '../repositories/i-user-repository';
import { map, flatMap, filter, catchError } from 'rxjs/operators';
import { UserContext } from '../../utilities/user-context';
import { NotificationHelper } from '../../utilities/notification-helper';
import { In } from 'typeorm';
import { Notification } from '../../data/entities/notification';
import { NotificationToken } from '../models/results/notification-token';

export class CreateEvent implements ICreateEvent {
    constructor(private eventRepository: IEventRepository,
                private notificationTokenRepository: INotificationTokenRepository,
                private userRepository: IUserRepository,
                private userContext: UserContext) {
    }

    execute(input: EventInput): Observable<EventResult> {
        return this.eventRepository.insert(input)
            .pipe(flatMap((event) => this.sendNotificationsToUsers(event)));
    }

    private sendNotificationsToUsers(event: EventResult) {
        const userIdsFlow =  this.userRepository.find({ favoriteSport: event.sport.id})
            .pipe(map((users) => users !== undefined
                                    ? users.map((user) => user.id).filter((id) => id !== this.userContext.userId)
                                    : users ));
        const notificationTokenFlow = this.userRepository.find({ favoriteSport: event.sport.id})
            .pipe(map((users) => users ?  users.map((u) => u.id) : []))
            .pipe(filter((userIds) => userIds && userIds !== undefined && userIds.length > 0))
            .pipe(flatMap((ids) =>  this.notificationTokenRepository.find({ where: { userId: In(ids)} })));

        return zip(userIdsFlow, notificationTokenFlow)
                    .pipe(map((result) => {
                            const notifications = NotificationHelper.buildCreateEventNotifications(event, result[0]);
                            notifications.map((notification) => {
                                const tokens = result[1].filter( (n) => n.userId === notification.userId);
                                this.sendNotification(notification, tokens); });
                            return of(true);
                    }))
                    .pipe(catchError(() => of(false)))
                    .pipe(map(() => event));

    }

    private sendNotification(notification: Notification, tokens: NotificationToken[]) {
        return from(notification.save())
            .pipe(flatMap((noti) => NotificationHelper.sendNotification(noti, tokens.map((to) => to.token))));
    }
}
