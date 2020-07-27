import { Observable, zip, throwError } from 'rxjs';
import { map, flatMap, catchError } from 'rxjs/operators';
import { CredentialsInput } from '../models/inputs/credentials-input';
import { Tokens } from '../models/results/tokens';
import { User } from '../models/results/user';
import { ITokensRepository } from '../repositories/i-tokens-repository';
import { IUserRepository } from '../repositories/i-user-repository';
import { ICreateTokens } from './i-create-tokens';
import { AuthHelper } from '../../utilities/auth-helper';
import { Errors } from '../../utilities/errors';

export class CreateTokens implements ICreateTokens {
    constructor(private readonly tokensRepository: ITokensRepository,
                private readonly userRepository: IUserRepository) {
    }

    execute(input: CredentialsInput): Observable<Tokens> {
        return this.userRepository.findOne({ login: input.login, enabled: true })
            .pipe(catchError(() => throwError(new Error(Errors.NotRegistered))))
            .pipe(flatMap((user) => this.userRepository.getCredentials(user.id)))
            .pipe(flatMap((credentials) => AuthHelper.comparePassords(input.password, credentials.password)))
            .pipe(flatMap((passwordMatches) => passwordMatches === false
                ? throwError(new Error(Errors.IncorrectPassoword))
                : this.saveToken(input)));
    }

    private saveToken(input: CredentialsInput): Observable<Tokens> {
        const accessTokenFlow: Observable<string> = AuthHelper.buildAccessToken(input);
        const refreshTokenFlow: Observable<string> = AuthHelper.buildRefreshToken();
        const userFlow: Observable<User> = this.userRepository.findOne({ login: input.login, enabled: true});

        return zip(userFlow, accessTokenFlow, refreshTokenFlow)
            .pipe(map((result) => new Tokens({
                user: result[0],
                accessToken: result[1],
                refreshToken: result[2],
                expireIn: AuthHelper.expireIn,
            })))
            .pipe(flatMap((token) => this.tokensRepository.insert(token)));
    }
}
