import { from, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { EventInput } from '../../business/models/inputs/event-input';
import { UpdateEventInput } from '../../business/models/inputs/update-event-input';
import { EventsParameter } from '../../business/models/parameters/events-parameter';
import { Event as EventResult } from '../../business/models/results/event';
import { Pagination } from '../../business/models/results/pagination';
import { IEventRepository } from '../../business/repositories/i-event-repository';
import { CreatePagination } from '../commands/create-pagination';
import { Address } from '../entities/address';
import { Event } from '../entities/event';
import { EventFactory } from '../factories/event-factory';


export class EventRepository implements IEventRepository {
    constructor(private readonly createPagination: CreatePagination) {
    }

    insert(input: EventInput): Observable<EventResult> {
        return of(EventFactory.entity.fromEventInput(input))
            .pipe(switchMap((entity) => entity.save()))
            .pipe(map((entity) => EventFactory.result.fromEventEntity(entity)));
    }

    update(input: UpdateEventInput): Observable<EventResult> {
        return of(EventFactory.entity.fromUpdateEventInput(input))
            .pipe(switchMap((entity) => entity.save()))
            .pipe(map((entity) => EventFactory.result.fromEventEntity(entity)));
    }

    get(parameter: EventsParameter): Observable<Pagination> {
        const totalCountOptions = { title: parameter.title };
        const itemsOptions = this.buildOptions(parameter);

        return this.createPagination
            .withEntity(Event)
            .withParameter(parameter.pagination)
            .withTotalCountOptions(totalCountOptions)
            .withItemsOptions(itemsOptions)
            .execute()
            .pipe(map((pagination) => this.buildPagination(pagination)));
    }

    getById(id: any): Observable<EventResult> {
        return from(Event.findOneOrFail(id));
    }

    private buildPagination(pagination: any): Pagination {
        return new Pagination({ ...pagination, items: EventFactory.results.fromEventEntities(pagination.items) });
    }

    private buildOptions(parameter: EventsParameter): any {
        return {
            order: {
                description: 'ASC',
                id: 'DESC',
            },
            skip: parameter.pagination.pageSize * parameter.pagination.pageIndex,
            take: parameter.pagination.pageSize,
        };
    }
}
