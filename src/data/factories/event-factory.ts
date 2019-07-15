import { EventInput } from '../../business/models/inputs/event-input';
import { UpdateEventInput } from '../../business/models/inputs/update-event-input';
import { Event as EventResult } from '../../business/models/results/event';
import { Event as EventEntity } from '../entities/event';

export class EventFactory {
    static makeEntity(input: EventInput): EventEntity {
        return new EventEntity(input);
    }

    static makeUpdateEntity(input: UpdateEventInput): EventEntity {
        return new EventEntity(input);
    }

    static makeResult(entity: EventEntity): EventResult {
        return new EventResult(entity);
    }
}
