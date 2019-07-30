import { Observable } from 'rxjs';
import { Tokens } from '../models/results/tokens';

export interface ITokensRepository {
    insert(tokens: Tokens): Observable<Tokens>;
}
