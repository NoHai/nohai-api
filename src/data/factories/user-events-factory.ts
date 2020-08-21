import { UserEvents as UserEventsResult } from '../../business/models/results/user-events';
import { UserEvents as UserEventsEntity } from '../entities/user-events';
import { UserEventsInput } from '../../business/models/inputs/user-events-input';
import { User } from '../entities/user';

export class UserEventsFactory {
    static entity = {
        fromUserEventsInput: (userEvent: UserEventsInput) => new UserEventsEntity(userEvent),
        fromUserEventsResult: (userEvent: UserEventsResult) => new UserEventsEntity(userEvent),
    };

    static result = {
        fromUserEventsEntity: (userEvent: UserEventsEntity) => new UserEventsResult({
            ...userEvent,
            user: User.findOne(userEvent.userId),
        }),
    };

    static results = {
        fromUserEventsEntities: (userEvents: UserEventsEntity[]): UserEventsResult[] => {
            return userEvents.map((userEvent) => new UserEventsResult({
                ...userEvent,
                user: User.findOne(userEvent.userId, { relations: ['details']}),
            }));
        },

        fromUserEventResultsLight: (userEvents: UserEventsResult[]): any[] =>
            userEvents.map((userEvent) => {
                return {
                    userId: userEvent.userId,
                    eventId: userEvent.eventId,
                };
            }),
    };
}
