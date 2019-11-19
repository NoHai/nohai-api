import { from, Observable, of } from 'rxjs';
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

export class UserRepository implements IUserRepository {
    insert(input: CredentialsInput): Observable<Credentials> {
        return of(UserFactory.entity.fromCredentialsInput(input))
            .pipe(flatMap((entity) => entity.save()))
            .pipe(map((entity) => CredentialsFactory.result.fromUserEntity(entity)));
    }

    findOne(parameter: any): Observable<UserResult> {
        return from(UserEntity.findOneOrFail(parameter))
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

    updateCredentials(credentials: CredentialsInput): Observable<boolean> {
        return from(UserEntity.findOneOrFail({ login: credentials.login }))
            .pipe(flatMap((entity) => {
                entity.password = AuthHelper.hashPassword(credentials.password);
                entity.save();
                return of(true);
            })).pipe(catchError(() => of(false)));
    }

    getWithCredentials(ids: any[]): Observable<any[]> {
        return from(UserEntity.findByIds(ids))
            .pipe(map((results) => UserFactory.results.fromUsersWithCredentials(results)));
    }

    find(parameter: any): Observable<UserResult[] | undefined> {
        return from(UserEntity.find(parameter))
            .pipe(map((entities) => UserFactory.results.fromUserEntities(entities)))
            .pipe(catchError(() => of(undefined)));
    }

    activate(login: string): Observable<boolean> {
        return from(User.findOneOrFail({ login }))
            .pipe(flatMap((entity) => {
                entity.enabled = true;
                return entity.save({ reload: true });
            }))
            .pipe(map((savedEntity) => savedEntity.enabled));
    }
}

