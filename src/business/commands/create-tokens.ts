import { Observable, zip, throwError } from 'rxjs';
import { map, flatMap, catchError } from 'rxjs/operators';

import { CredentialsInput } from '../models/inputs/credentials-input';
import { Tokens } from '../models/results/tokens';
import { User } from '../models/results/user';
import { ITokensRepository } from '../repositories/i-tokens-repository';
import { IUserRepository } from '../repositories/i-user-repository';
import { ICreateTokens } from './i-create-tokens';
import { Errors } from '../../utilities/errors';
import { AuthHelper } from '../../utilities/auth-helper';

export class CreateTokens implements ICreateTokens {
    constructor(private readonly tokensRepository: ITokensRepository,
                private readonly userRepository: IUserRepository) {
    }

    execute(input: CredentialsInput): Observable<Tokens> {
        return this.userRepository.byCredentials(input.login)
            .pipe(catchError(() => throwError(Errors.NotRegisteredError)))
            .pipe(flatMap((user) => this.userRepository.getCredentials(user.id)))
            .pipe(flatMap((credentials) => AuthHelper.comparePassords(input.password, credentials.password)))
            .pipe(flatMap((passwordMatches) => passwordMatches === false
                ? throwError(Errors.IncorrectPassowordError)
                : this.saveToken(input)));
    }

    private saveToken(input: CredentialsInput): Observable<Tokens> {
        const accessTokenFlow: Observable<string> = this.buildAccessToken(input);
        const refreshTokenFlow: Observable<string> = AuthHelper.buildRefreshToken();
        const userFlow: Observable<User> = this.userRepository.byCredentials(input.login);

        return zip(userFlow, accessTokenFlow, refreshTokenFlow)
            .pipe(map((result) => new Tokens({
                user: result[0],
                accessToken: result[1],
                refreshToken: result[2],
                expireIn: AuthHelper.expireIn,
            })))
            .pipe(flatMap((token) => this.tokensRepository.insert(token)));
    }

    private buildAccessToken(credentials: CredentialsInput): Observable<string> {
        return this.userRepository.byCredentials(credentials.login)
            .pipe(map((user) => ({
                userId: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
            })))
            .pipe(map((token) => AuthHelper.signToken(token)));
    }
}
