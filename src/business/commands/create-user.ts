import { Observable, iif, throwError } from 'rxjs';
import { CredentialsInput } from '../models/inputs/credentials-input';
import { Credentials } from '../models/results/credentials';
import { IUserRepository } from '../repositories/i-user-repository';
import { ICreateUser } from './i-create-user';

import { flatMap } from 'rxjs/operators';
import { Errors } from '../../utilities/Errors';
import { AuthHelper } from '../../utilities/auth-helper';

export class CreateUser implements ICreateUser {
    constructor(private userRepository: IUserRepository) {
    }

    execute(input: CredentialsInput): Observable<Credentials> {
        const hashedInput = AuthHelper.hashCredentials(input);
        return this.userRepository.byCredentials(input)
                    .pipe(flatMap((user) => iif(() => user !== undefined)
                                ? throwError(Errors.AlreadyRegisterdError)
                                :  this.userRepository.insert(hashedInput)));
    }
}
