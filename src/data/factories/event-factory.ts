import { EventInput } from '../../business/models/inputs/event-input';
import { UpdateEventInput } from '../../business/models/inputs/update-event-input';
import { Event as EventResult } from '../../business/models/results/event';
import { Address } from '../entities/address';
import { Event as EventEntity } from '../entities/event';
import { AddressFactory } from './address-factory';
import { SportFactory } from './sport-factory';
import { Sport } from '../entities/sport';
import { User } from '../entities/user';
import { UserFactory } from './user-factory';

export class EventFactory {
    static entity = {
        fromEventInput: (event: EventInput, userId: string): EventEntity => new EventEntity({
            ...event,
            address: AddressFactory.entity.fromAddressResult(event.address),
            sport: SportFactory.entity.fromSportResult(event.sport),
            owner:  UserFactory.entity.fromId(userId),
        }),
        fromUpdateEventInput: (event: UpdateEventInput): EventEntity => new EventEntity({
            ...event,
            address: AddressFactory.entity.fromAddressResult(event.address),
            sport: SportFactory.entity.fromSportResult(event.sport),
        }),
    };

    static result = {
        fromEventEntity: (event: EventEntity): EventResult => new EventResult({
            ...event,
            address: Address.findOneOrFail(event.address.id),
            sport: Sport.findOneOrFail(event.sport.id),
        }),
    };

    static results = {
        fromEventEntities: (entities: EventEntity[]): EventResult[] =>
            entities.map((event) => new EventResult({
                ...event,
                address: Address.findOneOrFail(event.address.id),
                sport: Sport.findOneOrFail(event.sport.id),
            })),
    };
}
