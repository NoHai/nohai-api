import { Observable, of, from, zip } from 'rxjs';
import { map, switchMap, flatMap } from 'rxjs/operators';
import { INotificationRepository } from '../../business/repositories/i-notification-repository';
import { Notification as NotificationResult } from '../../business/models/results/notification';
import { Notification as NotificationEntity } from '../entities/notification';
import { NotificationInput } from '../../business/models/inputs/notification-input';
import { NotificationFactory } from '../factories/notification-factory';
import { Pagination } from '../../business/models/results/pagination';
import { CreatePagination } from '../commands/create-pagination';
import { PaginationParameter } from '../../business/models/parameters/pagination-parameter';
import { Event } from '../entities/event';
import { User } from '../entities/user';
import { UserContext } from '../../utilities/user-context';
import { NotificationHelper } from '../../utilities/notification-helper';
import { NotificationType } from '../enums/notification-type';
import { NotificationStatus } from '../enums/notification-status';

export class NotificationRepository implements INotificationRepository {
    constructor(private readonly createPagination: CreatePagination,
                private readonly userContext: UserContext) {
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

    joinEvent(eventId: string): Observable<NotificationResult> {
        console.log(this.userContext.userId);
        const eventFlow = from(Event.findOneOrFail(eventId));
        const userFlow = from(User.findOneOrFail(this.userContext.userId));

        return zip(eventFlow, userFlow)
            .pipe(flatMap((result) =>  this.buildNotification(result[0], result[1]).save()))
            .pipe(map((entity) => NotificationFactory.result.fromNotificationEntity(entity)));
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

    private buildNotification(event: any, user: any): NotificationEntity {
       return new NotificationEntity({ title: NotificationHelper.joinNotificationTitle(),
                                       body: NotificationHelper.joinNotificationBody(event, user),
                                       eventId: event.id,
                                       user: event.owner,
                                       avatarUrl: user.picture,
                                       createdUser: user.id,
                                       createdDate: Date.UTC.toString(),
                                       notificationType: NotificationType.JoinRequest,
                                       status: NotificationStatus.Pending });
    }
}
