import { sign } from 'jsonwebtoken';
import { Observable, of, zip, from, pipe, throwError, iif } from 'rxjs';
import { map, tap, flatMap, filter, throwIfEmpty, catchError } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

import { CredentialsInput } from '../models/inputs/credentials-input';
import { Tokens } from '../models/results/tokens';
import { User } from '../models/results/user';
import { ITokensRepository } from '../repositories/i-tokens-repository';
import { IUserRepository } from '../repositories/i-user-repository';
import { ICreateTokens } from './i-create-tokens';
import { Errors } from '../utilities/Errors';

export class CreateTokens implements ICreateTokens {
    private static buildRefreshToken(): Observable<string> {
        return of(uuid().toString());
    }

    constructor(private readonly tokensRepository: ITokensRepository,
                private readonly userRepository: IUserRepository) {
    }

    execute(input: CredentialsInput): Observable<Tokens> {
        return  this.userRepository.byCredentials(input)
                    .pipe(flatMap((user) => this.userRepository.getCredentials(user.id)))
                    .pipe(catchError(() => throwError(Errors.NotRegisteredError)))
                    .pipe(flatMap((credentials) => this.comparePassords(input.password, credentials)))
                    .pipe(flatMap((passwordMatches) => passwordMatches === false
                                                     ? throwError(Errors.IncorrectPassowordError)
                                                     : this.saveToken(input)));
    }

    private saveToken(input: CredentialsInput): Observable<Tokens> {
        const accessTokenFlow: Observable<string> = this.buildAccessToken(input);
        const refreshTokenFlow: Observable<string> = CreateTokens.buildRefreshToken();
        const userFlow: Observable<User> = this.userRepository.byCredentials(input);

        return  zip(userFlow, accessTokenFlow, refreshTokenFlow)
                .pipe(map((result) => new Tokens({ user: result[0], accessToken: result[1], refreshToken: result[2] })))
                .pipe(flatMap((token) => this.tokensRepository.insert(token)));
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
