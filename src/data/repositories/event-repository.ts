import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Event as EventModel } from '../../business/models/event';
import { EventsParameter } from '../../business/models/parameters/events-parameter';
import { IEventRepository } from '../../business/repositories/i-event-repository';
import { IDataAutomapper } from '../../data-mapping/i-data-automapper';
import { Event as EventEntity } from '../entities/event';
import { IStorage } from '../i-storage';
import { IStorageFactory } from '../i-storage-factory';

export class EventRepository implements IEventRepository {
    private readonly storage: Observable<IStorage<EventEntity>>;
    private readonly mapper: IDataAutomapper;

    constructor(storageFactory: IStorageFactory, mapper: IDataAutomapper) {
        this.storage = storageFactory.make<EventEntity>();
        this.mapper = mapper;
    }

    insert(event: EventModel): Observable<EventModel> {
        return this.mapper
            .map<EventModel, EventEntity>(event)
            .pipe(switchMap((eventEntity) => this.insertEntity(eventEntity)))
            .pipe(switchMap((eventEntity) => this.mapper.map<EventEntity, EventModel>(eventEntity)));
    }

    getMany(filter: EventsParameter): Observable<EventModel[]> {
        return this.storage.pipe(switchMap((storage) => storage.getMany(filter)));
    }

    private insertEntity(eventEntity: EventEntity): Observable<EventEntity> {
        return this.storage.pipe(switchMap((storage) => storage.insert(eventEntity)));
    }
}
