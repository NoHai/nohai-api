import { Observable } from 'rxjs';
import { IDeleteUserEvents } from './i-delete-user-events';
import { IUserEventsRepository } from '../repositories/i-user-events-repository';

export class DeleteUserEvents implements IDeleteUserEvents {
    constructor(private readonly userEventsRepository: IUserEventsRepository) {
    }

    execute(id: string): Observable<number | undefined> {
        return this.userEventsRepository.delete(id);
    }
}
