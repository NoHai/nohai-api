import { PaginationParameter } from './pagination-parameter';

export class SearchEventsParameter {
    sports?: string[];
    startDate?: Date;
    searchText?: string;
    showHistory!: boolean;
    pagination!: PaginationParameter;

    constructor(init?: any) {
        Object.assign(this, init);
    }

}
