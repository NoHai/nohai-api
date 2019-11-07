import { from, Observable, of, zip } from 'rxjs';
import { map, switchMap, flatMap, catchError } from 'rxjs/operators';
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
import moment = require('moment');
import { Sport } from '../entities/sport';
import { Brackets, MoreThanOrEqual } from 'typeorm';
import { EventStatus } from '../enums/event-status';

export class EventRepository implements IEventRepository {
    constructor(private readonly createPagination: CreatePagination,
                private readonly userContext: UserContext) {
    }

    insert(input: EventInput): Observable<EventResult> {
        const startDate = moment(input.startDate);
        const eventInput = of(EventFactory.entity.fromEventInput(input, this.userContext.userId));
        const generateTitle = this.generateTitle(input, startDate);

        return zip(eventInput, generateTitle)
            .pipe(flatMap((result) => {
                result[0].title = result[1].trim();
                return result[0].save();
            }))
            .pipe(map((event) => EventFactory.result.fromEventEntity(event)));
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

    find(parameter: any): Observable<EventResult[]> {
        return from(Event.find(parameter))
            .pipe(map((event) => EventFactory.results.fromEventEntities(event)));
    }

    delete(id: string): Observable<boolean> {
        return from(Event.findOneOrFail(id))
            .pipe(map((entity) => {
                entity.status = EventStatus.Cancelled;
                entity.save();
                return true;
            }))
            .pipe(catchError(() => of(false)));
    }

    private buildPagination(pagination: any): Pagination {
        return new Pagination({
            ...pagination,
            items: EventFactory.results.fromEventEntities(pagination.items),
        });
    }

    private buildOptions(parameter: EventsParameter): any {
        const todayDate = moment().format('YYYY-MM-DD').toString();
        return {
            where: {
                startDate: MoreThanOrEqual(todayDate),
            },
            order: {
                startDate: 'ASC',
                title: 'ASC',
            },
            relations: ['address', 'sport'],
            skip: parameter.pagination.pageSize * parameter.pagination.pageIndex,
            take: parameter.pagination.pageSize,
        };
    }

    private countTotalOptions() {
        const todayDate = moment().format('YYYY-MM-DD').toString();
        return {
            where: {
                startDate: MoreThanOrEqual(todayDate),
            },
        };
    }

    private async getHistoryEvents(parameter: EventsParameter): Promise<Pagination> {
        const [items, count] = await Event.createQueryBuilder('event')
            .leftJoinAndSelect('event.sport', 'sport')
            .leftJoinAndSelect('event.address', 'address')
            .leftJoinAndSelect('event.owner', 'owner')
            .leftJoinAndSelect(UserEvents, 'userEvents',
                'userEvents.event_id = event.id AND userEvents.user_id = :userId',
                { userId: this.userContext.userId })
            .where('userEvents.id IS NOT NULL')
            .orWhere(
                new Brackets((qb) => {
                    qb.where('event.owner = :owner', { owner: this.userContext.userId });
                    qb.andWhere('userEvents.id IS NULL');
                }),
            )
            .orderBy('event.startDate')
            .addOrderBy('event.title')
            .skip(parameter.pagination.pageSize * parameter.pagination.pageIndex)
            .take(parameter.pagination.pageSize)
            .getManyAndCount();

        return new Pagination({
            items: EventFactory.results.fromEventEntities(items),
            pageIndex: parameter.pagination.pageIndex,
            pageSize: parameter.pagination.pageSize,
            totalCount: count,
            customCount: 0,
        });
    }

    private getAllEvents(parameter: EventsParameter) {
        return this.createPagination
            .withEntity(Event)
            .withParameter(parameter.pagination)
            .withItemsOptions(this.buildOptions(parameter))
            .withTotalCountOptions(this.countTotalOptions())
            .execute()
            .pipe(map((pagination) => this.buildPagination(pagination)));
    }

    private generateTitle(input: EventInput, startDate: moment.Moment) {
        return from(Sport.findOneOrFail(input.sport.id))
            // tslint:disable-next-line: max-line-length
            .pipe(map((sport) => `${sport.name}, ${startDate.locale('ro').format('dddd')} ${startDate.format('DD')} ${startDate.format('MMMM')} ora ${input.startTime}`));
    }
}
