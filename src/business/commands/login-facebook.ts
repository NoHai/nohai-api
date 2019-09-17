import { ILoginFacebook } from './i-login-facebook';
import { FacebookCredentialsInput } from '../models/inputs/facebook-credentials-input';
import { Observable, zip, iif } from 'rxjs';
import { Tokens } from '../models/results/tokens';
import { IUserRepository } from '../repositories/i-user-repository';
import { flatMap, map, catchError } from 'rxjs/operators';
import { ITokensRepository } from '../repositories/i-tokens-repository';
import { AuthHelper } from '../../utilities/auth-helper';
import { User } from '../models/results/user';

export class LoginFacebook implements ILoginFacebook {
    constructor(private readonly userRepository: IUserRepository,
                private readonly tokensRepository: ITokensRepository) { }

    execute(input: FacebookCredentialsInput): Observable<Tokens> {
        const hashedInput = AuthHelper.hashFacebookCredentials(input);
        const freshLogin = this.userRepository.insertFb(hashedInput)
            .pipe(flatMap((cred) => this.saveToken(cred)));

        return this.userRepository.byCredentials(input.login)
            .pipe(catchError(() => freshLogin))
            .pipe(flatMap(() => this.saveToken(input)));
    }

    private saveToken(input: FacebookCredentialsInput): Observable<Tokens> {
        const accessTokenFlow: Observable<string> = this.buildAccessToken(input);
        const refreshTokenFlow: Observable<string> = AuthHelper.buildRefreshToken();
        const userFlow: Observable<User> = this.userRepository.byCredentials(input.login);

        return zip(userFlow, accessTokenFlow, refreshTokenFlow)
            .pipe(map((result) => new Tokens({
                user: result[0],
                accessToken: result[1],
                refreshToken: result[2],
                expireIn: process.env.NOHAI_JWT_EXPIRE_IN,
            })))
            .pipe(flatMap((token) => this.tokensRepository.insert(token)));
    }

    private buildAccessToken(credentials: FacebookCredentialsInput): Observable<string> {
        return this.userRepository.byCredentials(credentials.login)
            .pipe(map((user) => ({
                userId: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
            })))
            .pipe(map((token) => AuthHelper.signToken(token)));
    }
}
