import { EventInput } from '../../business/models/inputs/event-input';
import { UpdateEventInput } from '../../business/models/inputs/update-event-input';
import { Event as EventResult } from '../../business/models/results/event';
import { Event as EventEntity } from '../entities/event';

export class EventFactory {
    static entity = {
        fromEventInput: (input: EventInput): EventEntity => new EventEntity(input),
        fromUpdateEventInput: (input: UpdateEventInput): EventEntity => new EventEntity(input),
    };

    static result = {
        fromEventEntity: (entity: EventEntity): EventResult => new EventResult(entity),
    };

    static results = {
        fromEventEntities: (entities: EventEntity[]): EventResult[] =>
            entities.map((entity) => new EventResult(entity)),
    };
}
