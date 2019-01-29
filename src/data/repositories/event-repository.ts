import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Event as EventModel } from '../../business/models/event';
import { EventsParameter } from '../../business/models/parameters/events-parameter';
import { IEventRepository } from '../../business/repositories/i-event-repository';
import { Event as EventEntity } from '../entities/event';
import { IStorage } from '../i-storage';
import { IStorageFactory } from '../i-storage-factory';

export class EventRepository implements IEventRepository {
    private readonly storage: Observable<IStorage<EventEntity>>;

    constructor(storageFactory: IStorageFactory) {
        this.storage = storageFactory.make<EventEntity>();
    }

    insert(event: EventModel): Observable<EventModel> {
        return this.storage.pipe(map((storage) => storage.insert(event)));
    }

    getMany(filter: EventsParameter): Observable<EventModel[]> {
        return this.storage.pipe(switchMap((storage) => storage.getMany(filter)));

    }
}
