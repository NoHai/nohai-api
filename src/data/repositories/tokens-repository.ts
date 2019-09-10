import { from, Observable, of, zip } from 'rxjs';
import { defaultIfEmpty, filter, map, switchMap, flatMap, tap } from 'rxjs/operators';

import { Tokens as TokensResult } from '../../business/models/results/tokens';
import { ITokensRepository } from '../../business/repositories/i-tokens-repository';
import { Tokens as TokensEntity } from '../entities/tokens';
import { TokensFactory } from '../factories/tokens-factory';
import { UserFactory } from '../factories/user-factory';
import { User } from '../../business/models/results/user';
import { User as UserEntity } from '../../data/entities/user';

export class TokensRepository implements ITokensRepository {
    insert(tokens: TokensResult): Observable<TokensResult> {
        const findTokens = from(TokensEntity.findOne(tokens.user.id));

        const saveTokens = of(TokensFactory.entity.fromTokensResult(tokens))
            .pipe(switchMap((entity) => from(entity.save())));

        const exists = findTokens.pipe(filter((foundTokens) => foundTokens !== undefined))
            .pipe(map((foundTokens) => foundTokens || new TokensEntity())) // Only because of build issue.
            .pipe(switchMap((foundTokens) => foundTokens.remove()))
            .pipe(switchMap(() => saveTokens))
            .pipe(defaultIfEmpty());

        const doesNotExist = findTokens.pipe(filter((foundTokens) => foundTokens === undefined))
            .pipe(switchMap(() => saveTokens))
            .pipe(defaultIfEmpty());

        return zip(exists, doesNotExist).pipe(map(() => tokens));
    }

    getUser(refresh: string): Observable<User> {
       return  from(TokensEntity.findOneOrFail({ refreshToken: refresh},  { relations: ['user'] }))
                .pipe(map((token) => UserFactory.result.fromUserEntity(token.user)));
    }
}
