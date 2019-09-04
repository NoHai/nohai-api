import { sign } from 'jsonwebtoken';
import { Observable, of, zip, from, iif } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

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

    constructor(private readonly tokensRepository: ITokensRepository,
                private readonly userRepository: IUserRepository) {
    }

    execute(input: CredentialsInput): Observable<Tokens> {
        let tokens: any;
        const userFlow: Observable<User> = this.userRepository.byCredentials(input);
        const hasValidCredentials = userFlow
                    .pipe(map((user) => this.userRepository.getCredentials(user.id)))
                    .pipe(switchMap((credentials) => this.comparePassords(input.password, credentials)))
                    .pipe(tap());

        console.log('exceute');
        console.log(hasValidCredentials);

        const accessTokenFlow: Observable<string> = this.buildAccessToken(input);
        const refreshTokenFlow: Observable<string> = CreateTokens.buildRefreshToken();

        return  zip(userFlow, accessTokenFlow, refreshTokenFlow)
                .pipe(map((result) => new Tokens({ user: result[0], accessToken: result[1], refreshToken: result[2] })))
                .pipe(switchMap((token) => this.tokensRepository.insert(token)));

        // } else {
        //     return tokens;
        // }
    }

    private buildAccessToken(credentials: CredentialsInput): Observable<string> {
        return this.userRepository.byCredentials(credentials)
            .pipe(map((user) => ({ userId: user.id, firstName: user.firstName, lastName: user.lastName, expires: 'tomorrow' })))
            .pipe(map((token) => this.sign(token)));
    }

    private sign(accessToken: any): string {
        return sign(accessToken, process.env.NOHAI_JWT_SECRET || '', {
            algorithm: 'HS256',
            encoding: 'UTF8',
        });
    }

    private comparePassords(inputPassword: string, credentials: any): Observable<boolean> {
         return from(bcrypt.compare(inputPassword, credentials.password));
    }
}
