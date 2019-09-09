import { Notification as NotificationResult } from '../../business/models/results/notification';
import { Notification as NotificationEntity } from '../entities/notification';
import { NotificationInput } from '../../business/models/inputs/notification-input';
import { Event } from '../entities/event';

export class NotificationFactory {
    static entity = {
        fromNotificationResult: (notification: NotificationResult) =>  new NotificationEntity(notification),
        fromNotificationInput: (input: NotificationInput) => new NotificationEntity(input),
    };

    static result = {
        fromNotificationEntity: (notification: NotificationEntity) => new NotificationResult(notification),
    };

    static results = {
        fromNotificationEntities: (entities: NotificationEntity[]): NotificationResult[] =>
            entities.map((notification) => new NotificationResult(notification)),
    };
}
