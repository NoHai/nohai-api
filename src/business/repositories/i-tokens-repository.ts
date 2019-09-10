import { Observable } from 'rxjs';
import { Tokens } from '../models/results/tokens';
import { User } from '../models/results/user';

export interface ITokensRepository {
    insert(tokens: Tokens): Observable<Tokens>;
    getUser(refresh: string): Observable<User>;
}
