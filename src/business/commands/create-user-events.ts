import { Observable } from 'rxjs';
import { ICreateUserEvents } from './i-create-user-events';
import { IUserEventsRepository } from '../repositories/i-user-events-repository';
import { UserEventsInput } from '../models/inputs/user-events-input';
import { UserEvents } from '../models/results/user-events';

export class CreateUserEvents implements ICreateUserEvents {
    constructor(private readonly userEventsRepository: IUserEventsRepository) {
    }

    execute(input: UserEventsInput): Observable<UserEvents> {
        return this.userEventsRepository.insert(input);
    }
}
