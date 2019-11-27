import { Observable, zip, throwError, of } from 'rxjs';
import { map, flatMap, catchError } from 'rxjs/operators';
import { Tokens } from '../models/results/tokens';
import { User } from '../models/results/user';
import { ITokensRepository } from '../repositories/i-tokens-repository';
import { AuthHelper } from '../../utilities/auth-helper';
import { IRefreshToken } from './i-refresh-token';
import { Errors } from '../../utilities/errors';

export class RefreshToken implements IRefreshToken {
    constructor(private readonly tokensRepository: ITokensRepository) {
    }

    execute(refresh: string): Observable<Tokens | undefined> {
        return this.tokensRepository.getUser(refresh)
            .pipe(catchError(() => of(undefined)))
            .pipe(flatMap((user) => this.saveToken(user, refresh)));

    }

    private saveToken(user: User | undefined, refreshToken: string): Observable<Tokens | undefined> {
        if (!!user) {
            const accessTokenFlow: Observable<string> = this.buildAccessToken(refreshToken);
            const refreshTokenFlow: Observable<string> = AuthHelper.buildRefreshToken();

            return zip(accessTokenFlow, refreshTokenFlow)
                .pipe(map((result) => new Tokens({
                    user,
                    accessToken: result[0],
                    refreshToken: result[1],
                    expireIn: AuthHelper.expireIn,
                })))
                .pipe(flatMap((token) => this.tokensRepository.insert(token)));
        } else {
            return of(undefined);
        }
    }

    private buildAccessToken(refreshToken: string): Observable<string> {
        return this.tokensRepository.getUser(refreshToken)
            .pipe(catchError(() => throwError(new Error(Errors.UnableToLogin))))
            .pipe(map((user) => ({
                userId: user.id,
                firstName: user.details ? user.details.firstName : '',
                lastName: user.details ? user.details.lastName : '',
            })))
            .pipe(map((token) => AuthHelper.signToken(token)));
    }
}
