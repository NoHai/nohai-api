import { Credentials } from '../../business/models/results/credentials';
import { User as UserEntity } from '../entities/user';
import { FacebookCredentials } from '../../business/models/results/facebook-credentials';

export class CredentialsFactory {
    static result = {
        fromUserEntity: (input: UserEntity) => new Credentials(input),
        fromFacebookUserEntity: (input: UserEntity) => new FacebookCredentials(input),
    };
}
