import { CredentialsInput } from '../../business/models/inputs/credentials-input';
import { UpdateUserInput } from '../../business/models/inputs/update-user-input';
import { User as UserResult } from '../../business/models/results/user';
import { User as UserEntity } from '../entities/user';
import { AuthHelper } from '../../utilities/auth-helper';
import { Credentials } from '../../business/models/results/credentials';
import { Sport } from '../entities/sport';

export class UserFactory {
    static entity = {
        fromCredentialsInput: (input: CredentialsInput) => {
            const picture = AuthHelper.hashEmail(input.login);
            const hashedInput = AuthHelper.hashCredentials(input);
            return new UserEntity({
                ...hashedInput,
                picture,
            });
        },
        fromUserInput: (user: UpdateUserInput) => new UserEntity(user),
        fromUserResult: (user: UserResult) => new UserEntity(user),
        fromId: (id: string) => new UserEntity({ id }),
    };

    static credentials = {
        fromUserEntity: (user: UserEntity) => new Credentials({
            ...user,
        }),
    };

    static result = {
        fromUserEntity: (user: UserEntity) => new UserResult({
            ...user,
            favoriteSport: Sport.findOne(user.favoriteSport),
        }),
        fromUserWithCredentials: (user: UserEntity) => {
            const res = new UserResult(user);
            return {
                user: res,
                email: user.login,
            };
        },
        fromCredentials: (cred: Credentials) => new UserResult({
            login: cred.login,
            id: cred.id,
            loginWithFb: cred.loginWithFb,
        }),
    };

    static results = {
        fromUsersWithCredentials: (users: UserEntity[]): any[] =>
            users.map((user) => {
                const res = new UserResult(user);
                return {
                    user: res,
                    email: user.login,
                };
            }),
        fromUserEntities: (users: UserEntity[]): UserResult[] =>
            users.map((user) => new UserResult(user)),
    };
}
