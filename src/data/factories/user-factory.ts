import { CredentialsInput } from '../../business/models/inputs/credentials-input';
import { User as UserEntity } from '../entities/user';

export class UserFactory {
    static entity = {
        fromCredentialsInput: (input: CredentialsInput) => new UserEntity(input),
    };
}
