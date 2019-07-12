import { Observable } from 'rxjs';
import { UserInput } from '../models/inputs/user-input';
import { User as UserResult } from '../models/results/user';
import { IUserRepository } from '../repositories/i-user-repository';
import { ICreateUser } from './i-create-user';

export class CreateUser implements ICreateUser {
    constructor(private eventRepository: IUserRepository) {
    }

    execute(input: UserInput): Observable<UserResult> {
        return this.eventRepository.insert(input);
    }
}
