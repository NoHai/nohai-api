import { PaginationParameter } from './pagination-parameter';
import { EventStatus } from '../../../data/enums/event-status';

export class SearchEventsParameter {
    sports?: string[];
    startDate?: Date;
    searchText?: string;
    status?: EventStatus;
    showHistory!: boolean;
    pagination!: PaginationParameter;

    constructor(init?: any) {
        Object.assign(this, init);
    }

}
