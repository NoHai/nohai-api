import { PaginationParameter } from './pagination-parameter';

export class EventsParameter {
    title!: string;
    pagination!: PaginationParameter;

    constructor(init?: any) {
        Object.assign(this, init);
    }

}
