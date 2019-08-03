export class Pagination {
    pageSize!: number;
    pageIndex!: number;
    totalCount!: number;
    items!: any[];

    constructor(init?: any) {
        Object.assign(this, init);
    }
}
