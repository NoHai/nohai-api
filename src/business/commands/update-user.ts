import { Observable } from 'rxjs';
import { UpdateUserInput } from '../models/inputs/update-user-input';
import { User as UserResult } from '../models/results/user';
import { IUserRepository } from '../repositories/i-user-repository';
import { IUpdateUser } from './i-update-user';
import { UserContext } from '../../utilities/user-context';

export class UpdateUser implements IUpdateUser {
    constructor(private userRepository: IUserRepository,
                private userContext: UserContext) {
    }

    execute(input: UpdateUserInput): Observable<UserResult> {
        input.id = this.userContext.userId;
        return this.userRepository.update(input);
    }
}
