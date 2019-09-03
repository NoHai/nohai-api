import { INotificationTokenRepository } from '../repositories/i-notification-token-repository';
import { Observable } from 'rxjs';
import { IDeleteNotificationToken } from './i-delete-notification-token';

export class DeleteNotificationToken implements IDeleteNotificationToken {
    constructor(private readonly notificationTokenRepository: INotificationTokenRepository) {
    }

    execute(id: string): Observable<number | undefined> {
        return this.notificationTokenRepository.delete(id);
    }
}
