import { Observable } from 'rxjs';
import { CredentialsInput } from '../models/inputs/credentials-input';
import { Credentials } from '../models/results/credentials';

export interface IUserRepository {
    insert(event: CredentialsInput): Observable<Credentials>;
}
