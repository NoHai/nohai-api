import { Observable } from 'rxjs';
import { UserInput } from '../models/inputs/user-input';
import { User as UserResult } from '../models/results/user';

export interface IUserRepository {
    insert(event: UserInput): Observable<UserResult>;
}
