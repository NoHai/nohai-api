import { Observable, from, zip } from 'rxjs';
import { UpdateEventInput } from '../models/inputs/update-event-input';
import { Event as EventResult } from '../models/results/event';
import { IEventRepository } from '../repositories/i-event-repository';
import { IUpdateEvent } from './i-update-event';
import { map, flatMap, filter } from 'rxjs/operators';
import { IUserEventsRepository } from '../repositories/i-user-events-repository';
import { NotificationHelper } from '../../utilities/notification-helper';
import { Notification } from '../../data/entities/notification';
import { NotificationToken } from '../models/results/notification-token';
import { INotificationTokenRepository } from '../repositories/i-notification-token-repository';
import { In } from 'typeorm';

export class UpdateEvent implements IUpdateEvent {
    constructor(private eventRepository: IEventRepository,
                private readonly userEventsRepository: IUserEventsRepository,
                private readonly notificationTokenRepository: INotificationTokenRepository) {
    }

    execute(input: UpdateEventInput): Observable<EventResult> {
        const updateEventFlow = this.eventRepository.update(input);
        const userIdsFlow = this.userEventsRepository.find({ eventId: input.id })
            .pipe(map((userEvents) => userEvents.map((u) => u.userId)));

        const notificationTokenFlow = this.userEventsRepository.find({ eventId: input.id})
            .pipe(map((users) => users.map((u) => u.userId)))
            .pipe(filter((userIds) => userIds && userIds.length > 0))
            .pipe(flatMap((ids) =>  this.notificationTokenRepository.find({ where: { userId: In(ids)} })));

        return zip(updateEventFlow, userIdsFlow, notificationTokenFlow)
            .pipe(map((result) => {
                const notifications = NotificationHelper.buildCancelEventNotifications(input, result[1]);
                notifications.map((notification) => {
                    const tokens = result[2].filter( (n) => n.userId === notification.userId);
                    this.sendNotification(notification, tokens); });
                return result[0];
            }));
    }

    private sendNotification(notification: Notification, tokens: NotificationToken[]) {
        return from(notification.save())
            .pipe(flatMap((noti) => NotificationHelper.sendNotification(noti, tokens.map((to) => to.token))));
    }
}
