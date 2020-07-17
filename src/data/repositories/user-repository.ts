import { from, Observable, of, zip } from 'rxjs';
import { map, flatMap, catchError, tap } from 'rxjs/operators';
import { CredentialsInput } from '../../business/models/inputs/credentials-input';
import { UpdateUserInput } from '../../business/models/inputs/update-user-input';
import { Credentials } from '../../business/models/results/credentials';
import { User as UserResult } from '../../business/models/results/user';
import { IUserRepository } from '../../business/repositories/i-user-repository';
import { User as UserEntity, User } from '../entities/user';
import { CredentialsFactory } from '../factories/credentials-factory';
import { UserFactory } from '../factories/user-factory';
import { AuthHelper } from '../../utilities/auth-helper';
import { UserDetailsInput } from '../../business/models/inputs/user-details-input';
import { UserDetailsFactory } from '../factories/user-details-factory';
import { UserDetails } from '../../business/models/results/user-details';
import { UserSports } from '../entities/user_sports';

export class UserRepository implements IUserRepository {
    insert(input: CredentialsInput): Observable<Credentials> {
        return of(UserFactory.entity.fromCredentialsInput(input))
            .pipe(flatMap((entity) => entity.save()))
            .pipe(map((entity) => CredentialsFactory.result.fromUserEntity(entity)));
    }

    findOne(parameter: any): Observable<UserResult> {
        return from(UserEntity.findOneOrFail(parameter, { relations: ['details']}))
            .pipe(map((foundEntity) => UserFactory.result.fromUserEntity(foundEntity)));
    }

    update(input: UpdateUserInput): Observable<UserResult> {
        return of(UserFactory.entity.fromUserInput(input))
            .pipe(flatMap((entity) => entity.save()))
            .pipe(map((entity) => UserFactory.result.fromUserEntity(entity)));
    }

    saveDetails(input: UserDetailsInput, userId: string): Observable<UserDetails> {

        const deleteExistingSportFlow = from(UserSports.delete({ user: { id: userId}}));

        const saveDetailsFlow = from(UserEntity.findOneOrFail({ id: userId }))
            .pipe(map((user) => UserDetailsFactory.entity.fromUserDetailsInput(input, user)))
            .pipe(flatMap((entity) => entity.save()))
            .pipe(map((entity) => UserDetailsFactory.result.fromUserDetailsEntity(entity)));

        return zip(deleteExistingSportFlow, saveDetailsFlow)
            .pipe(flatMap((result) => {
                return of(result[1]);
            }));
    }

    getById(id: string): Observable<UserResult> {
        const userFlow = from(UserEntity.findOneOrFail(id, { relations: ['details'] }));
        const sportFlow = UserSports.find({ user: { id } });

        return zip(userFlow, sportFlow)
            .pipe(flatMap((result) => {
                if (result[0].details !== null) {
                    result[0].details.favoriteSports = result[1];
                }

                return of(UserFactory.result.fromUserEntity(result[0]));
            }));
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

