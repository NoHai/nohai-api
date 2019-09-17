import { UserEvents as UserEventsResult } from '../../business/models/results/user-events';
import { UserEvents as UserEventsEntity } from '../entities/user-events';
import { UserEventsInput } from '../../business/models/inputs/user-events-input';

export class UserEventsFactory {
    static entity = {
        fromUserEventsInput: (userEvent: UserEventsInput) => new UserEventsEntity(userEvent),
        fromUserEventsResult: (userEvent: UserEventsResult) => new UserEventsEntity(userEvent),
    };

    static result = {
        fromUserEventsEntity: (userEvent: UserEventsEntity) => new UserEventsResult(userEvent),
    };

    static results = {
        fromUserEventsEntities: (userEvents: UserEventsEntity[]): UserEventsResult[] =>
            userEvents.map((userEvent) => new UserEventsResult(userEvent)),
    };
}
