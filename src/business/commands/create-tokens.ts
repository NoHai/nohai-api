import { sign } from 'jsonwebtoken';
import { Observable, of, zip } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

import { IPresentationSettings } from '../../presentation/i-presentation-settings';
import { CredentialsInput } from '../models/inputs/credentials-input';
import { Tokens } from '../models/results/tokens';
import { User } from '../models/results/user';
import { ITokensRepository } from '../repositories/i-tokens-repository';
import { IUserRepository } from '../repositories/i-user-repository';
import { ICreateTokens } from './i-create-tokens';

export class CreateTokens implements ICreateTokens {
    private static buildRefreshToken(): Observable<string> {
        return of(uuid().toString());
    }

    constructor(private readonly presentationSettings: IPresentationSettings,
                private readonly tokensRepository: ITokensRepository,
                private readonly userRepository: IUserRepository) {
    }

    execute(input: CredentialsInput): Observable<Tokens> {
        const userFlow: Observable<User> = this.userRepository.byCredentials(input);
        const accessTokenFlow: Observable<string> = this.buildAccessToken(input);
        const refreshTokenFlow: Observable<string> = CreateTokens.buildRefreshToken();

        return zip(userFlow, accessTokenFlow, refreshTokenFlow)
            .pipe(map((result) => new Tokens({ user: result[0], accessToken: result[1], refreshToken: result[2] })))
            .pipe(switchMap((tokens) => this.tokensRepository.insert(tokens)));
    }

    private buildAccessToken(credentials: CredentialsInput): Observable<string> {
        return this.userRepository.byCredentials(credentials)
            .pipe(map((user) => ({ firstName: user.firstName, lastName: user.lastName, expires: 'tomorrow' })))
            .pipe(map((token) => this.sign(token)));
    }

    private sign(accessToken: any): string {
        return sign(accessToken, this.presentationSettings.jwtSecret, {
            algorithm: 'HS256',
            encoding: 'UTF8',
        });
    }
}
