import { Observable } from 'rxjs';
import { CredentialsInput } from '../models/inputs/credentials-input';
import { Credentials } from '../models/results/credentials';
import { User } from '../models/results/user';

export interface IUserRepository {
    insert(event: CredentialsInput): Observable<Credentials>;

    byCredentials(credentials: CredentialsInput): Observable<User>;
}
