import { EventInput } from '../../business/models/inputs/event-input';
import { Event as EventResult } from '../../business/models/results/event';
import { Address } from '../entities/address';
import { Event as EventEntity } from '../entities/event';
import { AddressFactory } from './address-factory';
import { SportFactory } from './sport-factory';
import { Sport } from '../entities/sport';
import { UserFactory } from './user-factory';
import { UserEvents } from '../entities/user-events';
import { NotificationType } from '../enums/notification-type';
import { EventStatus } from '../enums/event-status';
import { CommentFactory } from './comment-factory';

export class EventFactory {
    static entity = {
        fromEventInput: (event: EventInput, userId: string): EventEntity => new EventEntity({
            ...event,
            address: AddressFactory.entity.fromAddressResult(event.address),
            sport: SportFactory.entity.fromSportResult(event.sport),
            owner: UserFactory.entity.fromId(userId),
            status: event.id ? EventStatus.Edited : EventStatus.Active,
        }),
        fromId: (id: string) => new EventEntity({ id }),
    };

    static result = {
        fromEventEntity: (event: EventEntity): EventResult => new EventResult({
            ...event,
            address: Address.findOne(event.address.id),
            sport: Sport.findOne(event.sport.id),
            numberOfParticipants: UserEvents.count({ eventId: event.id, status: NotificationType.ApproveJoin })}),
    };

    static results = {
        fromEventEntities: (entities: EventEntity[]): EventResult[] =>
            entities.map((event) => new EventResult({
                ...event,
                address: Address.findOne(event.address.id),
                sport: Sport.findOne(event.sport.id),
                numberOfParticipants: UserEvents.count({ eventId: event.id, status: NotificationType.ApproveJoin }),
            })),
    };
}
