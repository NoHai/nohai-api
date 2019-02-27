import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Event as EventModel } from '../../business/models/event';
import { EventsParameter } from '../../business/models/parameters/events-parameter';
import { IEventRepository } from '../../business/repositories/i-event-repository';
import { Event as EventEntity } from '../entities/event';
import { IDataAutomapper } from '../mapping/i-data-automapper';

export class EventRepository implements IEventRepository {
    constructor(private readonly mapper: IDataAutomapper) {
    }

    insert(event: EventModel): Observable<EventModel> {
        return this.mapper
            .map<EventModel, EventEntity>(event)
            .pipe(switchMap((eventEntity) => eventEntity.save()))
            .pipe(switchMap((eventEntity) => this.mapper.map<EventEntity, EventModel>(eventEntity)));
    }

    getMany(filter: EventsParameter): Observable<EventModel[]> {
        return from(EventEntity.find(filter))
            .pipe(switchMap((entities) => this.mapper.map<EventEntity[], EventModel[]>(entities)));
    }
}
