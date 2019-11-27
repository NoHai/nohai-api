import { ILoginFacebook } from './i-login-facebook';
import { FacebookCredentialsInput } from '../models/inputs/facebook-credentials-input';
import { Observable, zip, of, from, iif } from 'rxjs';
import { Tokens } from '../models/results/tokens';
import { IUserRepository } from '../repositories/i-user-repository';
import { flatMap, map, catchError } from 'rxjs/operators';
import { ITokensRepository } from '../repositories/i-tokens-repository';
import { AuthHelper } from '../../utilities/auth-helper';
import { User } from '../models/results/user';
import { CredentialsInput } from '../models/inputs/credentials-input';
import { UserFactory } from '../../data/factories/user-factory';

export class LoginFacebook implements ILoginFacebook {
    constructor(private readonly userRepository: IUserRepository,
                private readonly tokensRepository: ITokensRepository) { }

    execute(input: FacebookCredentialsInput): Observable<Tokens> {
        return from(AuthHelper.facebookoLogin(input))
            .pipe(flatMap((cred) => this.login(cred)));
    }

    private saveToken(user: User): Observable<Tokens> {
        const accessTokenFlow: Observable<string> = this.buildAccessToken(user);
        const refreshTokenFlow: Observable<string> = AuthHelper.buildRefreshToken();

        return zip(accessTokenFlow, refreshTokenFlow)
            .pipe(map((result) => new Tokens({
                user,
                accessToken: result[0],
                refreshToken: result[1],
                expireIn: AuthHelper.expireIn,
            })))
            .pipe(flatMap((token) => this.tokensRepository.insert(token)));
    }

    private buildAccessToken(credentials: any): Observable<string> {
        return this.userRepository.findOne({ login: credentials.login, enabled: true , relations: ['details']})
            .pipe(map((user) => ({
                userId: user.id,
                firstName: user.details.firstName,
                lastName: user.details.lastName,
            })))
            .pipe(map((token) => AuthHelper.signToken(token)));
    }

    private login(input: CredentialsInput): Observable<Tokens> {
        return this.userRepository.findOne({ login: input.login, enabled: true })
            .pipe(catchError(() => this.saveNewUser(input)))
            .pipe(flatMap((user) => this.saveToken(user)));
    }

    private saveNewUser(input: CredentialsInput): Observable<User> {
        return this.userRepository.insert(input)
            .pipe(map((cred) => UserFactory.result.fromCredentials(cred)));
    }
}
