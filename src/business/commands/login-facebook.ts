import { ILoginFacebook } from './i-login-facebook';
import { FacebookCredentialsInput } from '../models/inputs/facebook-credentials-input';
import { Observable, zip, of, from, iif } from 'rxjs';
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
        let login: any = null;

        return from(AuthHelper.facebookoLogin(input))
            .pipe(map((cred) => {
                login = cred;
                this.userRepository.byCredentials(cred.login);
            }))
            .pipe(catchError(() => of(undefined)))
            .pipe(flatMap((user) => iif(() => user === undefined,
                this.createUser(login),
                this.saveToken(login))));
    }

    private saveToken(input: any): Observable<Tokens> {
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

    private buildAccessToken(credentials: any): Observable<string> {
        return this.userRepository.byCredentials(credentials.login)
            .pipe(map((user) => ({
                userId: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
            })))
            .pipe(map((token) => AuthHelper.signToken(token)));
    }

    private createUser(input: any): Observable<Tokens> {
        return this.userRepository.insert(input)
            .pipe(flatMap((cred) => this.saveToken(cred)));
    }
}
