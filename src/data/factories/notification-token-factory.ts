import { NotificationToken as NotificationTokenResult } from '../../business/models/results/notification-token';
import { NotificationToken as NotificationTokenEntity } from '../entities/notification-token';
import { NotificationTokenInput } from '../../business/models/inputs/notification-token-input';

export class NotificationTokenFactory {
    static entity = {
        fromNotificationTokenResult: (notification: NotificationTokenResult) =>  new NotificationTokenEntity(notification),
        fromNotificationTokenInput: (input: NotificationTokenInput) => new NotificationTokenEntity(input),
    };

    static result = {
        fromNotificationTokenEntity: (notification: NotificationTokenEntity) => new NotificationTokenResult(notification),
    };

    static results = {
        fromNotificationTokenEntities: (entities: NotificationTokenEntity[]): NotificationTokenResult[] =>
            entities.map((notification) => new NotificationTokenResult(notification)),
    };
}
