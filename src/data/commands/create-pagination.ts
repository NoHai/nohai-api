import { from, Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginationParameter } from '../../business/models/parameters/pagination-parameter';

export class CreatePagination {
    private totalCountOptions: any;
    private itemsOptions: any;
    private entity: any;
    private parameter!: PaginationParameter;

    withEntity(entity: any): CreatePagination {
        this.entity = entity;
        return this;
    }

    withTotalCountOptions(options: any): CreatePagination {
        this.totalCountOptions = options;
        return this;
    }

    withItemsOptions(options: any): CreatePagination {
        this.itemsOptions = options;
        return this;
    }

    withParameter(parameter: PaginationParameter): CreatePagination {
        this.parameter = parameter;
        return this;
    }

    execute(): Observable<any> {
        const totalCountFlow = from(this.entity.count(this.totalCountOptions));
        const itemsFlow = from(this.entity.find(this.itemsOptions));
        return zip(totalCountFlow, itemsFlow).pipe(map((result) => this.buildPagination(result)));
    }

    private buildPagination(result: any): any {
        return {
            items: result[1],
            pageIndex: this.parameter.pageIndex,
            pageSize: this.parameter.pageSize,
            totalCount: result[0],
        };
    }
}
