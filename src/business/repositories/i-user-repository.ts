import { Observable } from 'rxjs';
import { CredentialsInput } from '../models/inputs/credentials-input';
import { UpdateUserInput } from '../models/inputs/update-user-input';
import { Credentials } from '../models/results/credentials';
import { User } from '../models/results/user';

export interface IUserRepository {
    insert(event: CredentialsInput): Observable<Credentials>;

    byCredentials(credentials: CredentialsInput): Observable<User>;

    update(input: UpdateUserInput): Observable<User>;

    getById(id: string): Observable<User>;
}
