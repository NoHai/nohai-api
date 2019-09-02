import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { INotificationRepository } from '../../business/repositories/i-notification-repository';
import { Notification as NotificationResult } from '../../business/models/results/notification';
import { Notification as NotificationEntity } from '../entities/notification';
import { NotificationInput } from '../../business/models/inputs/notification-input';
import { NotificationFactory } from '../factories/notification-factory';
import { Pagination } from '../../business/models/results/pagination';
import { CreatePagination } from '../commands/create-pagination';
import { PaginationParameter } from '../../business/models/parameters/pagination-parameter';

export class NotificationRepository implements INotificationRepository {
    constructor(private readonly createPagination: CreatePagination) {
    }

    get(parameter: PaginationParameter): Observable<Pagination> {
        const itemsOptions = this.buildOptions(parameter);
        return this.createPagination
        .withEntity(NotificationEntity)
        .withParameter(parameter)
        .withItemsOptions(itemsOptions)
        .execute()
        .pipe(map((pagination) => this.buildPagination(pagination)));
    }

    insert(input: NotificationInput): Observable<NotificationResult> {
        return of(NotificationFactory.entity.fromNotificationInput(input))
        .pipe(switchMap((entity) => entity.save()))
        .pipe(map((entity) => NotificationFactory.result.fromNotificationEntity(entity)));
    }

    markAllAsRead(): Observable<boolean> {
        throw new Error('Method not implemented.');
    }

    private buildOptions(parameter: PaginationParameter): any {
        return {
            order: {
                id: 'DESC',
            },
            skip: parameter.pageSize * parameter.pageIndex,
            take: parameter.pageSize,
        };
    }

    private buildPagination(pagination: any): Pagination {
        return new Pagination({ ...pagination, items: NotificationFactory.results.fromNotificationEntities(pagination.items) });
    }
}
