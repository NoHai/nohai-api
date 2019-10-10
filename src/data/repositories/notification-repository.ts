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
import { NotificationStatus } from '../enums/notification-status';
import { NotificationType } from '../enums/notification-type';

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
            .withTotalCountOptions(this.buildTotalCountOption())
            .withCustomCountOption(this.buildCustomCountOption())
            .execute()
            .pipe(map((pagination) => this.buildPagination(pagination)));
    }

    getById(id: string): Observable<NotificationResult> {
        return from(NotificationEntity.findOneOrFail(id))
            .pipe(map((notification) => NotificationFactory.result.fromNotificationEntity(notification)));
    }

    markAsRead(id: string): Observable<NotificationResult> {
        return from(NotificationEntity.findOneOrFail(id))
            .pipe(flatMap((entity) => {
                entity.status = NotificationStatus.Read;
                return entity.save();
            }))
            .pipe(map((updatedNotification) => NotificationFactory.result.fromNotificationEntity(updatedNotification)));
    }

    insert(input: NotificationInput): Observable<NotificationResult> {
        return of(NotificationFactory.entity.fromNotificationInput(input))
            .pipe(switchMap((entity) => entity.save()))
            .pipe(map((entity) => NotificationFactory.result.fromNotificationEntity(entity)));
    }

    markAllAsRead(): Observable<boolean> {
        return from(NotificationEntity.find({ userId: this.userContext.userId, status: 0 }))
            .pipe(map((notifications) => notifications.map((notification) => {
                notification.status = NotificationStatus.Read;
                notification.save();
            })))
            .pipe(map(() => true));
    }

    joinEvent(eventId: string): Observable<NotificationResult> {
        const eventFlow = from(Event.findOneOrFail(eventId));
        const userFlow = from(User.findOneOrFail(this.userContext.userId));

        return zip(eventFlow, userFlow)
            .pipe(flatMap((result) => NotificationHelper.buildJoinNotification(result[0], result[1]).save()))
            .pipe(map((entity) => NotificationFactory.result.fromNotificationEntity(entity)));
    }

    approve(eventId: string, userId: string): Observable<NotificationResult> {
        const eventFlow = from(Event.findOneOrFail(eventId));
        const userFlow = from(User.findOneOrFail(this.userContext.userId));

        return zip(eventFlow, userFlow)
            .pipe(flatMap((result) => NotificationHelper.buildApproveNotification(result[0], result[1], userId).save()))
            .pipe(map((entity) => NotificationFactory.result.fromNotificationEntity(entity)));
    }

    reject(eventId: string, userId: string): Observable<NotificationResult> {
        const eventFlow = from(Event.findOneOrFail(eventId));
        const userFlow = from(User.findOneOrFail(this.userContext.userId));

        return zip(eventFlow, userFlow)
            .pipe(flatMap((result) => NotificationHelper.buildRejectNotification(result[0], result[1], userId).save()))
            .pipe(map((entity) => NotificationFactory.result.fromNotificationEntity(entity)));
    }

    rejectAll(parameter: any): Observable<NotificationResult[]> {
        return from(NotificationEntity.find(parameter))
            .pipe(map((entities) => entities.map((notification) => {
                notification.status = NotificationStatus.Read;
                notification.notificationType = NotificationType.RejectJoin;
                notification.title = NotificationHelper.noSpotsAvailableTitle;
                return notification; })))
            .pipe(flatMap((updateEntities) => from(NotificationEntity.save(updateEntities))))
            .pipe(map((savedEntities) => NotificationFactory.results.fromNotificationEntities(savedEntities)));
    }

    private buildOptions(parameter: PaginationParameter): any {
        return {
            where: { userId: this.userContext.userId },
            order: {
                createdDate: 'DESC',
            },
            skip: parameter.pageSize * parameter.pageIndex,
            take: parameter.pageSize,
        };
    }

    private buildTotalCountOption(): any {
        return {
            where: {
                userId: this.userContext.userId,
            },
        };
    }

    private buildCustomCountOption(): any {
        return {
            where: {
                userId: this.userContext.userId,
                status: NotificationStatus.Unread,
            },
        };
    }

    private buildPagination(pagination: any): Pagination {
        return new Pagination({ ...pagination, items: NotificationFactory.results.fromNotificationEntities(pagination.items) });
    }
}
