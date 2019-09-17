import { Observable } from 'rxjs';
import { IUserRepository } from '../repositories/i-user-repository';
import { IGetUserById } from './i-get-user-by-id';
import { User } from '../models/results/user';
import { UserContext } from '../../utilities/user-context';

export class GetUserById implements IGetUserById {
    constructor(private readonly userRepository: IUserRepository,
                private readonly userContext: UserContext) {
    }

    execute(): Observable<User> {
        return this.userRepository.getById(this.userContext.userId);
    }
}
