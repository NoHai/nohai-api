import { from, Observable, of, zip, iif, throwError } from 'rxjs';
import { map, flatMap, catchError } from 'rxjs/operators';
import { Tokens as TokensResult } from '../../business/models/results/tokens';
import { ITokensRepository } from '../../business/repositories/i-tokens-repository';
import { Tokens as TokensEntity, Tokens } from '../entities/tokens';
import { TokensFactory } from '../factories/tokens-factory';
import { UserFactory } from '../factories/user-factory';
import { User } from '../../business/models/results/user';

export class TokensRepository implements ITokensRepository {
    insert(tokens: TokensResult): Observable<TokensResult> {
      return of(TokensFactory.entity.fromTokensResult(tokens))
            .pipe(flatMap((entity) => entity.save()))
            .pipe(map((savedEntity) => TokensFactory.result.fromTokensEntity(savedEntity)));

        // const deleteOldToken = from(Tokens.delete({ user: { id: tokens.user.id } }));
        // return zip(deleteOldToken, saveToken)
        //     .pipe(map((result) => result[1]));
    }

    getUser(refresh: string): Observable<User> {
        return from(TokensEntity.findOneOrFail({ refreshToken: refresh }, { relations: ['user'] }))
            .pipe(catchError((error) => throwError(error)))
            .pipe(map((token) => UserFactory.result.fromUserEntity(token.user)));
    }
}
