import { from, Observable, of, zip } from 'rxjs';
import { map, switchMap, flatMap, catchError } from 'rxjs/operators';
import { EventInput } from '../../business/models/inputs/event-input';
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
import { Brackets } from 'typeorm';
import { EventStatus } from '../enums/event-status';
import { SearchEventsParameter } from '../../business/models/parameters/search-events-parameter';
import { PaginationUtility } from '../../utilities/pagination-utility';

export class EventRepository implements IEventRepository {
    constructor(private readonly userContext: UserContext) {
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

    update(input: EventInput): Observable<EventResult> {
        return of(EventFactory.entity.fromEventInput(input, input.owner.id))
            .pipe(switchMap((entity) => entity.save()))
            .pipe(map((entity) => EventFactory.result.fromEventEntity(entity)));
    }

    getById(id: any): Observable<EventResult> {
        return from(Event.findOneOrFail(id, { relations: ['address', 'sport'] }))
            .pipe(map((event) => EventFactory.result.fromEventEntity(event)));
    }

    find(parameter: SearchEventsParameter): Observable<Pagination> {
        const searchEventsFlow = parameter.showHistory === true
            ? from(this.searchHistoryEvents(parameter))
            : from(this.searchEvents(parameter));
        return searchEventsFlow
            .pipe(map((result) => {
                const [items, count] = result;
                return new Pagination({
                    items: EventFactory.results.fromEventEntities(items),
                    pageIndex: parameter.pagination.pageIndex,
                    pageSize: parameter.pagination.pageSize,
                    totalCount: count,
                    customCount: 0,
                });
            }));
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

    private generateTitle(input: EventInput, startDate: moment.Moment) {
        return from(Sport.findOneOrFail(input.sport.id))
            // tslint:disable-next-line: max-line-length
            .pipe(map((sport) => `${sport.name}, ${startDate.locale('ro').format('dddd')} ${startDate.format('DD')} ${startDate.format('MMMM')} ora ${input.startTime}`));
    }

    private async searchEvents(parameter: SearchEventsParameter) {
        return await Event.createQueryBuilder('event')
            .leftJoinAndSelect('event.sport', 'sport')
            .leftJoinAndSelect('event.address', 'address')
            .leftJoinAndSelect('event.owner', 'owner')
            .leftJoinAndSelect('owner.details', 'details' )
            .where(PaginationUtility.startDateEventCondition(parameter, true),
                {
                    startDate: PaginationUtility.startDate(parameter, true),
                    startTime: PaginationUtility.getTodaysTime(),
                })
            .andWhere(PaginationUtility.sportsEventCondition(parameter), { sports: parameter.sports })
            .andWhere('event.status <> 0')
            .andWhere(new Brackets((qb) => {
                qb.where('event.title like :search', { search: `%${parameter.searchText}%` });
                qb.orWhere('event.description like :search', { search: `%${parameter.searchText}%` });
                qb.orWhere('address.city like :search', { search: `%${parameter.searchText}%` });
            }))
            .orderBy('event.startDate')
            .addOrderBy('event.title')
            .skip(parameter.pagination.pageSize * parameter.pagination.pageIndex)
            .take(parameter.pagination.pageSize)
            .getManyAndCount();
    }

    private async searchHistoryEvents(parameter: SearchEventsParameter) {
        return await Event.createQueryBuilder('event')
            .leftJoinAndSelect('event.sport', 'sport')
            .leftJoinAndSelect('event.address', 'address')
            .leftJoinAndSelect('event.owner', 'owner')
            .leftJoinAndSelect('owner.details', 'details' )
            .leftJoinAndSelect(UserEvents, 'userEvents',
                'userEvents.event_id = event.id AND userEvents.user_id = :userId',
                { userId: this.userContext.userId })
            .where(new Brackets((qb) => {
                qb.where('userEvents.id IS NOT NULL');
                qb.orWhere(
                    new Brackets((qb1) => {
                        qb1.where('event.owner = :owner', { owner: this.userContext.userId });
                        qb1.andWhere('userEvents.id IS NULL');
                    }),
                );
            },
            ))
            .andWhere(PaginationUtility.startDateEventCondition(parameter, false),
                { startDate: PaginationUtility.startDate(parameter, false), startTime: '' })
            .andWhere(PaginationUtility.sportsEventCondition(parameter), { sports: parameter.sports })
            .andWhere(new Brackets((qb) => {
                qb.where('event.title like :search', { search: `%${parameter.searchText}%` });
                qb.orWhere('event.description like :search', { search: `%${parameter.searchText}%` });
                qb.orWhere('address.city like :search', { search: `%${parameter.searchText}%` });
            }))
            .orderBy('event.startDate', 'DESC')
            .addOrderBy('event.title')
            .skip(parameter.pagination.pageSize * parameter.pagination.pageIndex)
            .take(parameter.pagination.pageSize)
            .getManyAndCount();
    }
}
