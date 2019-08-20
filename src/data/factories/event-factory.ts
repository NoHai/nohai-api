import { EventInput } from '../../business/models/inputs/event-input';
import { UpdateEventInput } from '../../business/models/inputs/update-event-input';
import { Event as EventResult } from '../../business/models/results/event';
import { Address } from '../entities/address';
import { Event as EventEntity } from '../entities/event';
import { AddressFactory } from './address-factory';

export class EventFactory {
    static entity = {
        fromEventInput: (event: EventInput): EventEntity => new EventEntity({
            ...event,
            address: AddressFactory.entity.fromAddressResult(event.address),
        }),
        fromUpdateEventInput: (event: UpdateEventInput): EventEntity => new EventEntity({
            ...event,
            address: AddressFactory.entity.fromAddressResult(event.address),
        }),
    };

    static result = {
        fromEventEntity: (event: EventEntity): EventResult => new EventResult({
            ...event,
            address: Address.findOneOrFail(event.address.id, { relations: ['city', 'county'] }),
        }),
    };

    static results = {
        fromEventEntities: (entities: EventEntity[]): EventResult[] =>
            entities.map((event) => new EventResult({
                ...event,
                address: Address.findOneOrFail(event.address.id, { relations: ['city', 'county'] }),
            })),
    };
}
