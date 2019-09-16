import { Observable, throwError, empty, iif, never, of } from 'rxjs';
import { CredentialsInput } from '../models/inputs/credentials-input';
import { Credentials } from '../models/results/credentials';
import { IUserRepository } from '../repositories/i-user-repository';
import { ICreateUser } from './i-create-user';
import { flatMap, catchError, tap } from 'rxjs/operators';
import { AuthHelper } from '../../utilities/auth-helper';
import { Errors } from '../../utilities/Errors';

export class CreateUser implements ICreateUser {
    constructor(private userRepository: IUserRepository) {
    }

    execute(input: CredentialsInput): Observable<Credentials> {
        const hashedInput = AuthHelper.hashCredentials(input);

        return this.userRepository.byCredentials(input.login)
            .pipe(catchError(() => of(undefined)))
            .pipe(flatMap((user) => iif(() => user !== undefined,
                throwError(Errors.AlreadyRegisterdError),
                this.userRepository.insert(hashedInput))));

    }
}
