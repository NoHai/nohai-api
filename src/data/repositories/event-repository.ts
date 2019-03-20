import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { EventInput } from '../../business/models/inputs/event-input';
import { Event as EventResult } from '../../business/models/results/event';
import { IEventRepository } from '../../business/repositories/i-event-repository';
import { EventFactory } from '../factories/event-factory';

export class EventRepository implements IEventRepository {
    insert(input: EventInput): Observable<EventResult> {
        return of(EventFactory.makeEntity(input))
            .pipe(switchMap((entity) => entity.save()))
            .pipe(map((entity) => EventFactory.makeResult(entity)));
    }
}
