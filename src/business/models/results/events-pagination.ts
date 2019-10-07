import { Pagination } from './pagination';

export class EventsPagination extends Pagination {
    numberOfParticipants!: number;
    constructor(init?: any) {
        super();
        Object.assign(this, init);
    }
}
