import { Observable, throwError, iif, of } from 'rxjs';
import { CredentialsInput } from '../models/inputs/credentials-input';
import { Credentials } from '../models/results/credentials';
import { IUserRepository } from '../repositories/i-user-repository';
import { ICreateUser } from './i-create-user';
import { flatMap, catchError } from 'rxjs/operators';
import { Errors } from '../../utilities/errors';

export class CreateUser implements ICreateUser {
    constructor(private userRepository: IUserRepository) {
    }

    execute(input: CredentialsInput): Observable<Credentials> {
        return this.userRepository.byCredentials(input.login)
            .pipe(catchError(() => of(undefined)))
            .pipe(flatMap((user) => iif(() => user !== undefined,
                throwError(Errors.AlreadyRegisterdError),
                this.userRepository.insert(input))));
    }
}
