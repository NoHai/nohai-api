import { CredentialsInput } from '../../business/models/inputs/credentials-input';
import { UpdateUserInput } from '../../business/models/inputs/update-user-input';
import { User as UserResult } from '../../business/models/results/user';
import { User as UserEntity } from '../entities/user';

export class UserFactory {
    static entity = {
        fromCredentialsInput: (input: CredentialsInput) => new UserEntity(input),
        fromUserInput: (user: UpdateUserInput) => new UserEntity(user),
        fromUserResult: (user: UserResult) => new UserEntity(user),
    };

    static result = {
        fromUserEntity: (user: UserEntity) => new UserResult(user),
    };
}
