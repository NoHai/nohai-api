import { Observable, of, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { EventInput } from '../../business/models/inputs/event-input';
import { UpdateEventInput } from '../../business/models/inputs/update-event-input';
import { Event as EventResult } from '../../business/models/results/event';
import { IEventRepository } from '../../business/repositories/i-event-repository';
import { EventFactory } from '../factories/event-factory';
import { EventsParameter } from '../../business/models/parameters/events-parameter';
import { Event } from '../entities/event';


export class EventRepository implements IEventRepository {
    insert(input: EventInput): Observable<EventResult> {
        return of(EventFactory.makeEntity(input))
            .pipe(switchMap((entity) => entity.save()))
            .pipe(map((entity) => EventFactory.makeResult(entity)));
    }

    update(input: UpdateEventInput): Observable<EventResult> {
        return of(EventFactory.makeUpdateEntity(input))
            .pipe(switchMap((entity) => entity.save()))
            .pipe(map((entity) => EventFactory.makeResult(entity)));
    }

    get(parameter: EventsParameter): Observable<EventResult[]> {
        let events = Event.find({
            order: {
                description: "ASC",
                id: "DESC"
            },
            take: parameter.pageSize
        });
        return from(events);
    }
}
