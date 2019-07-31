import { Observable } from 'rxjs';
import { UpdateUserInput } from '../models/inputs/update-user-input';
import { User as UserResult } from '../models/results/user';
import { IUserRepository } from '../repositories/i-user-repository';
import { IUpdateUser } from './i-update-user';

export class UpdateUser implements IUpdateUser {
    constructor(private userRepository: IUserRepository) {
    }

    execute(input: UpdateUserInput): Observable<UserResult> {
        return this.userRepository.update(input);
    }
}
