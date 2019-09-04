import { Observable } from 'rxjs';
import { IUserRepository } from '../repositories/i-user-repository';
import { IGetUserById } from './i-get-user-by-id';
import { User } from '../models/results/user';

export class GetUserById implements IGetUserById {
    constructor(private readonly userRepository: IUserRepository) {
    }

    execute(id: string): Observable<User> {
        return this.userRepository.getById(id);
    }
}
