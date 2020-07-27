import { from, Observable, throwError, zip } from 'rxjs';
import { catchError, flatMap, map } from 'rxjs/operators';
import { UserFactory } from '../../data/factories/user-factory';
import { AuthHelper } from '../../utilities/auth-helper';
import { Errors } from '../../utilities/errors';
import { CredentialsInput } from '../models/inputs/credentials-input';
import { FacebookCredentialsInput } from '../models/inputs/facebook-credentials-input';
import { Tokens } from '../models/results/tokens';
import { User } from '../models/results/user';
import { ITokensRepository } from '../repositories/i-tokens-repository';
import { IUserRepository } from '../repositories/i-user-repository';
import { ILoginFacebook } from './i-login-facebook';

export class LoginFacebook implements ILoginFacebook {
    constructor(private readonly userRepository: IUserRepository,
                private readonly tokensRepository: ITokensRepository) { }

    execute(input: FacebookCredentialsInput): Observable<Tokens> {
        return from(AuthHelper.facebookoLogin(input))
            .pipe(flatMap((cred) => this.login(cred)));
    }

    private saveToken(credentials: CredentialsInput): Observable<Tokens> {
        const accessTokenFlow: Observable<string> = AuthHelper.buildAccessToken(credentials);
        const refreshTokenFlow: Observable<string> = AuthHelper.buildRefreshToken();
        const userFlow = this.userRepository.findOne({ login: credentials.login, enabled: true });

        return zip(accessTokenFlow, refreshTokenFlow, userFlow)
            .pipe(map((result) => new Tokens({
                user: result[2],
                accessToken: result[0],
                refreshToken: result[1],
                expireIn: AuthHelper.expireIn,
            })))
            .pipe(flatMap((token) => this.tokensRepository.insert(token)));
    }

    private login(input: CredentialsInput): Observable<Tokens> {
        const inputLoginWithFb = input.loginWithFb;
        return this.userRepository.findOne({ login: input.login, enabled: true })
            .pipe(catchError(() => this.saveNewUser(input)))
            .pipe(flatMap((user) => this.userRepository.getCredentials(user.id)))
            .pipe(flatMap((credentials) => AuthHelper.comparePassords(inputLoginWithFb, credentials.loginWithFb)))
            .pipe(catchError(() => throwError(new Error(Errors.AlreadyRegisterd))))
            .pipe(flatMap((fbUserIdMatches) => fbUserIdMatches === false
                ? throwError(new Error(Errors.GenericError))
                : this.saveToken(input)));
    }

    private saveNewUser(input: CredentialsInput): Observable<User> {
        input.loginWithFb = AuthHelper.hashPassword(input.loginWithFb);
        return this.userRepository.insert(input)
            .pipe(map((cred) => UserFactory.result.fromCredentials(cred)))
            .pipe(catchError(() => throwError(new Error(Errors.GenericError))));
    }
}
