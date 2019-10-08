import { Observable, zip } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { Tokens } from '../models/results/tokens';
import { User } from '../models/results/user';
import { ITokensRepository } from '../repositories/i-tokens-repository';
import { AuthHelper } from '../../utilities/auth-helper';
import { IRefreshToken } from './i-refresh-token';

export class RefreshToken implements IRefreshToken {
    constructor(private readonly tokensRepository: ITokensRepository) {
    }

    execute(refresh: string): Observable<Tokens> {
        const accessTokenFlow: Observable<string> = this.buildAccessToken(refresh);
        const refreshTokenFlow: Observable<string> = AuthHelper.buildRefreshToken();
        const userFlow: Observable<User> = this.tokensRepository.getUser(refresh);
        return zip(userFlow, accessTokenFlow, refreshTokenFlow)
            .pipe(map((result) => new Tokens({
                user: result[0],
                accessToken: result[1],
                refreshToken: result[2],
                expireIn: AuthHelper.expireIn,
            })))
            .pipe(flatMap((token) => this.tokensRepository.insert(token)));

    }

    private buildAccessToken(refreshToken: string): Observable<string> {
        return this.tokensRepository.getUser(refreshToken)
            .pipe(map((user) => ({
                userId: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
            })))
            .pipe(map((token) => AuthHelper.signToken(token)));
    }
}
