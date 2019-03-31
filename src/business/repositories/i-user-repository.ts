import { Observable } from 'rxjs';
import { User } from '../../data/entities/user';

export interface IUserRepository {
    insert(event: User): Observable<User>;
}
