import { Observable } from 'rxjs';
import { CredentialsInput } from '../models/inputs/credentials-input';
import { UpdateUserInput } from '../models/inputs/update-user-input';
import { Credentials } from '../models/results/credentials';
import { User } from '../models/results/user';
import { UserDetails } from '../models/results/user-details';
import { UserDetailsInput } from '../models/inputs/user-details-input';

export interface IUserRepository {
    insert(event: CredentialsInput): Observable<Credentials>;

    findOne(parameter: any): Observable<User>;

    update(input: UpdateUserInput): Observable<User>;

    getById(id: string): Observable<User>;

    getCredentials(id: string): Observable<Credentials>;

    getWithCredentials(ids: any[]): Observable<any[]>;

    updateCredentials(input: CredentialsInput): Observable<boolean>;

    find(parameter: any): Observable<User[] | undefined>;

    activate(login: string): Observable<boolean>;

    saveDetails(input: UserDetailsInput, userId: string): Observable<UserDetails>;
}
