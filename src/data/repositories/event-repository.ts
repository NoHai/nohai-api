import { from, Observable, of } from 'rxjs';
import { map, switchMap, flatMap } from 'rxjs/operators';
import { EventInput } from '../../business/models/inputs/event-input';
import { UpdateEventInput } from '../../business/models/inputs/update-event-input';
import { EventsParameter } from '../../business/models/parameters/events-parameter';
import { Event as EventResult } from '../../business/models/results/event';
import { Pagination } from '../../business/models/results/pagination';
import { IEventRepository } from '../../business/repositories/i-event-repository';
import { CreatePagination } from '../commands/create-pagination';
import { Event } from '../entities/event';
import { EventFactory } from '../factories/event-factory';
import { UserContext } from '../../utilities/user-context';
import { UserEvents } from '../entities/user-events';

export class EventRepository implements IEventRepository {
    constructor(private readonly createPagination: CreatePagination,
                private readonly userContext: UserContext) {
    }

    insert(input: EventInput): Observable<EventResult> {
        return of(EventFactory.entity.fromEventInput(input, this.userContext.userId))
            .pipe(flatMap((entity) => entity.save()))
            .pipe(map((entity) => EventFactory.result.fromEventEntity(entity)));
    }

    update(input: UpdateEventInput): Observable<EventResult> {
        return of(EventFactory.entity.fromUpdateEventInput(input))
            .pipe(switchMap((entity) => entity.save()))
            .pipe(map((entity) => EventFactory.result.fromEventEntity(entity)));
    }

    get(parameter: EventsParameter): Observable<Pagination> {
        if (parameter.showHistory === true) {
            return from(this.getHistoryEvents(parameter));
        } else {
            return this.getAllEvents(parameter);
        }
    }

    getById(id: any): Observable<EventResult> {
        return from(Event.findOneOrFail(id, { relations: ['address', 'sport'] }))
            .pipe(map((event) => EventFactory.result.fromEventEntity(event)));
    }

    private buildPagination(pagination: any): Pagination {
        return new Pagination({ ...pagination, items: EventFactory.results.fromEventEntities(pagination.items) });
    }

    private buildOptions(parameter: EventsParameter): any {
        return {
            order: {
                description: 'ASC',
                date: 'ASC',
            },
            relations: ['address', 'sport'],
            skip: parameter.pagination.pageSize * parameter.pagination.pageIndex,
            take: parameter.pagination.pageSize,
        };
    }

    private async getHistoryEvents(parameter: EventsParameter): Promise<Pagination> {
        const [items, count] = await Event.createQueryBuilder()
            .leftJoinAndSelect(UserEvents, 'userEvents', 'userEvents.event_id = event.id')
            .where('event.owner = :owner', { owner: this.userContext.userId })
            .orWhere('userEvents.user_id = :userId', { userId: this.userContext.userId })
            .orderBy('date')
            .skip(parameter.pagination.pageSize * parameter.pagination.pageIndex)
            .take(parameter.pagination.pageSize)
            .getManyAndCount();
        return {
            items,
            pageIndex: parameter.pagination.pageIndex,
            pageSize: parameter.pagination.pageSize,
            totalCount: count,
        };
    }

    private getAllEvents(parameter: EventsParameter) {
        return this.createPagination
            .withEntity(Event)
            .withParameter(parameter.pagination)
            .withItemsOptions(this.buildOptions(parameter))
            .execute()
            .pipe(map((pagination) => this.buildPagination(pagination)));
    }
}
