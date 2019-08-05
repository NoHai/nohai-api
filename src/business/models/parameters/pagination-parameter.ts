export class PaginationParameter {
    pageSize!: number;
    pageIndex!: number;

    constructor(init?: any) {
        Object.assign(this, init);
    }

}
