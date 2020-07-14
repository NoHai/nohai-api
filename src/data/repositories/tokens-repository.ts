import { from, Observable, of } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { Tokens as TokensResult } from '../../business/models/results/tokens';
import { ITokensRepository } from '../../business/repositories/i-tokens-repository';
import { Tokens as TokensEntity, Tokens } from '../entities/tokens';
import { TokensFactory } from '../factories/tokens-factory';
import { UserFactory } from '../factories/user-factory';
import { User } from '../../business/models/results/user';

export class TokensRepository implements ITokensRepository {
    insert(tokens: TokensResult): Observable<TokensResult> {
        return from(Tokens.delete({ user: { id: tokens.user.id } }))
            .pipe(flatMap(() => of(TokensFactory.entity.fromTokensResult(tokens)))
                , flatMap((entity) => entity.save())
                , flatMap((savedEntity) => of(TokensFactory.result.fromTokensEntity(savedEntity))));
    }

    getUser(refresh: string): Observable<User> {
        return from(TokensEntity.findOneOrFail({ refreshToken: refresh }, { relations: ['user', 'user.details'] }))
            .pipe(map((token) => UserFactory.result.fromUserEntity(token.user)));
    }
}
