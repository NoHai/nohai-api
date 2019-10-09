import { from, Observable, of, throwError } from 'rxjs';
import { map, flatMap, catchError } from 'rxjs/operators';
import { CredentialsInput } from '../../business/models/inputs/credentials-input';
import { UpdateUserInput } from '../../business/models/inputs/update-user-input';
import { Credentials } from '../../business/models/results/credentials';
import { User as UserResult } from '../../business/models/results/user';
import { IUserRepository } from '../../business/repositories/i-user-repository';
import { User as UserEntity, User } from '../entities/user';
import { CredentialsFactory } from '../factories/credentials-factory';
import { UserFactory } from '../factories/user-factory';
import { AuthHelper } from '../../utilities/auth-helper';
import { Errors } from '../../utilities/errors';

export class UserRepository implements IUserRepository {
    insert(input: CredentialsInput): Observable<Credentials> {
        return of(UserFactory.entity.fromCredentialsInput(input))
            .pipe(flatMap((entity) => entity.save()))
            .pipe(map((entity) => CredentialsFactory.result.fromUserEntity(entity)));
    }

    byCredentials(login: string): Observable<UserResult> {
        return from(UserEntity.findOneOrFail({ login }))
            .pipe(catchError(() => throwError(new Error(Errors.NotRegistered))))
            .pipe(map((foundEntity) => UserFactory.result.fromUserEntity(foundEntity)));
    }

    update(input: UpdateUserInput): Observable<UserResult> {
        return of(UserFactory.entity.fromUserInput(input))
            .pipe(flatMap((entity) => entity.save()))
            .pipe(map((entity) => UserFactory.result.fromUserEntity(entity)));
    }

    getById(id: string): Observable<UserResult> {
        return of(UserEntity.findOneOrFail(id))
            .pipe(flatMap((entity) => from(entity)))
            .pipe(map((entity) => UserFactory.result.fromUserEntity(entity)));
    }

    getCredentials(id: string): Observable<Credentials> {
        return of(UserEntity.findOneOrFail(id))
            .pipe(flatMap((entity) => from(entity)))
            .pipe(map((entity) => CredentialsFactory.result.fromUserEntity(entity)));
    }

    updateCredentials(credentials: CredentialsInput): Observable<void> {
        return from(UserEntity.findOneOrFail({ login: credentials.login }))
            .pipe(map((entity) => {
                entity.password = AuthHelper.hashPassword(credentials.password);
                entity.save();
            }));
    }
}

