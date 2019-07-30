import { CredentialsInput } from '../../business/models/inputs/credentials-input';
import { User as UserResult } from '../../business/models/results/user';
import { User as UserEntity } from '../entities/user';

export class UserFactory {
    static entity = {
        fromCredentialsInput: (input: CredentialsInput) => new UserEntity(input),
        fromUserResult: (user: UserResult) => new UserEntity(user),
    };

    static result = {
        fromUserEntity: (user: UserEntity) => new UserResult(user),
    };
}
