import moment = require('moment');
import { MoreThanOrEqual, Like, In, Not, IsNull } from 'typeorm';
import { EventsParameter } from '../business/models/parameters/events-parameter';
import { SearchEventsParameter } from '../business/models/parameters/search-events-parameter';

export class PaginationUtility {

    static countTotalEvents() {
        const todayDate = moment().format('YYYY-MM-DD').toString();
        return {
            where: {
                startDate: MoreThanOrEqual(todayDate),
            },
        };
    }

    static eventsOptions(parameter: EventsParameter): any {
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

    static searchEventsOptions(parameter: SearchEventsParameter): any {
        const startDate = parameter.startDate
            ? moment(parameter.startDate).format('YYYY-MM-DD').toString()
            : parameter.startDate;

        return {
            relations: ['address', 'sport'],
            where: [{
                startDate: startDate ? MoreThanOrEqual(startDate) : Not(IsNull()),
                status: parameter.status,
                title: Like(`%${parameter.searchText}%`),
                sport: parameter.sports ? In(parameter.sports) : Not(IsNull()),
                address: { city: Like(`%${parameter.searchText}%`)},
            },
            {
                startDate: startDate ? MoreThanOrEqual(startDate) : Not(IsNull()),
                status: parameter.status,
                description: Like(`%${parameter.searchText}%`),
                sport: parameter.sports ? In(parameter.sports) : Not(IsNull()),
                address: { city: Like(`%${parameter.searchText}%`)},
            },
            ],
            skip: parameter.pagination.pageSize * parameter.pagination.pageIndex,
            take: parameter.pagination.pageSize,
        };
    }

    static countTotalSearchEvents(parameter: SearchEventsParameter) {
        const startDate = parameter.startDate
            ? moment(parameter.startDate).format('YYYY-MM-DD').toString()
            : parameter.startDate;

        return {
            where: [{
                startDate: startDate ? MoreThanOrEqual(startDate) : Not(IsNull()),
                status: parameter.status,
                title: Like(`%${parameter.searchText}%`),
                sport: parameter.sports ? In(parameter.sports) : Not(IsNull()),
                address: { city: Like(`%${parameter.searchText}%`)},
            },
            {
                startDate: startDate ? MoreThanOrEqual(startDate) : Not(IsNull()),
                status: parameter.status,
                description: Like(`%${parameter.searchText}%`),
                sport: parameter.sports ? In(parameter.sports) : Not(IsNull()),
            },
            ],
        };
    }

}
