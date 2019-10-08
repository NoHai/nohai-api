import { PaginationParameter } from './pagination-parameter';

export class EventsParameter {
    showHistory!: boolean;
    pagination!: PaginationParameter;

    constructor(init?: any) {
        Object.assign(this, init);
    }

}
