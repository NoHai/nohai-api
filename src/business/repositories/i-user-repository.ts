import { Observable } from 'rxjs';
import { CredentialsInput } from '../models/inputs/credentials-input';
import { UpdateUserInput } from '../models/inputs/update-user-input';
import { Credentials } from '../models/results/credentials';
import { User } from '../models/results/user';
import { FacebookCredentialsInput } from '../models/inputs/facebook-credentials-input';
import { FacebookCredentials } from '../models/results/facebook-credentials';

export interface IUserRepository {
    insert(event: CredentialsInput): Observable<Credentials>;

    insertFb(credentials: FacebookCredentialsInput): Observable<FacebookCredentials>;

    byCredentials(login: string): Observable<User>;

    update(input: UpdateUserInput): Observable<User>;

    getById(id: string): Observable<User>;

    getCredentials(id: string): Observable<Credentials>;

    updateCredentials(email: string, newPassword: string): Observable<void>;
}
