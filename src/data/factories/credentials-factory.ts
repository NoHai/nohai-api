import { Credentials } from '../../business/models/results/credentials';
import { User as UserEntity } from '../entities/user';

export class CredentialsFactory {
    static result = {
        fromUserEntity: (input: UserEntity) => new Credentials(input),
    };
}
