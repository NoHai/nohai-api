import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Event as EventModel } from '../../business/models/event';
import { EventsParameter } from '../../business/models/parameters/events-parameter';
import { IEventRepository } from '../../business/repositories/i-event-repository';
import { Event as EventEntity } from '../entities/event';
import { IStorage } from '../i-storage';
import { IStorageFactory } from '../i-storage-factory';
import { IDataAutomapper } from '../mapping/i-data-automapper';

export class EventRepository implements IEventRepository {
    private readonly storage: IStorage<EventEntity>;
    private readonly mapper: IDataAutomapper;

    constructor(storageFactory: IStorageFactory, mapper: IDataAutomapper) {
        this.storage = storageFactory.make<EventEntity>();
        this.mapper = mapper;
    }

    insert(event: EventModel): Observable<EventModel> {
        return this.mapper
            .map<EventModel, EventEntity>(event)
            .pipe(switchMap((eventEntity) => this.storage.insert(eventEntity)))
            .pipe(switchMap((eventEntity) => this.mapper.map<EventEntity, EventModel>(eventEntity)));
    }

    getMany(filter: EventsParameter): Observable<EventModel[]> {
        return this.storage.getMany(filter);
    }
}
