import { Tokens as TokensResult } from '../../business/models/results/tokens';
import { Tokens as TokensEntity } from '../entities/tokens';
import { UserFactory } from './user-factory';

export class TokensFactory {
    static entity = {
        fromTokensResult: (tokens: TokensResult) => new TokensEntity({
            ...tokens,
            user: UserFactory.entity.fromUserResult(tokens.user),
        }),
    };

    static result = {
        fromTokensEntity: (tokens: TokensEntity) => new TokensResult({
            ...tokens,
            user: UserFactory.result.fromUserEntity(tokens.user),
        }),
    };
}
