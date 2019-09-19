import { CredentialsInput } from '../../business/models/inputs/credentials-input';
import { UpdateUserInput } from '../../business/models/inputs/update-user-input';
import { User as UserResult } from '../../business/models/results/user';
import { User as UserEntity } from '../entities/user';
import { FacebookCredentialsInput } from '../../business/models/inputs/facebook-credentials-input';
import { AuthHelper } from '../../utilities/auth-helper';

export class UserFactory {
    static entity = {
        fromCredentialsInput: (input: CredentialsInput) => {
            const picture = AuthHelper.hashEmail(input.login);
            const hashedInput = AuthHelper.hashCredentials(input);
            return new UserEntity({
                ...hashedInput,
                picture,
                loginWithFb: false,
            });
        },
        fromFacebookCredentialsInput: (input: FacebookCredentialsInput) => {
            const picture = AuthHelper.hashEmail(input.login);
            const hashedInput = AuthHelper.hashFacebookCredentials(input);
            return new UserEntity({
                ...hashedInput,
                picture,
                loginWithFb: false,
            });
        },
        fromUserInput: (user: UpdateUserInput) => new UserEntity(user),
        fromUserResult: (user: UserResult) => new UserEntity(user),
    };

    static result = {
        fromUserEntity: (user: UserEntity) => new UserResult(user),
    };
}
