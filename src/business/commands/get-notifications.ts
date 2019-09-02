import { Observable } from 'rxjs';
import { IGetNotifications } from './i-get-notifications';
import { Pagination } from '../models/results/pagination';
import { INotificationRepository } from '../repositories/i-notification-repository';
import { PaginationParameter } from '../models/parameters/pagination-parameter';

export class GetNotifications implements IGetNotifications {

    constructor(private notificationRepository: INotificationRepository) {
    }

    execute(parameter: PaginationParameter): Observable<Pagination> {
        return this.notificationRepository.get(parameter);
    }
}
