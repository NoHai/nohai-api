import { sign, verify } from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { CredentialsInput } from '../business/models/inputs/credentials-input';
import { Observable, of, from } from 'rxjs';
import uuid = require('uuid');
import { FacebookCredentialsInput } from '../business/models/inputs/facebook-credentials-input';
import crypto from 'crypto';
import axios from 'axios';
import { map, catchError, tap } from 'rxjs/operators';
import { IUserRepository } from '../business/repositories/i-user-repository';
import { UserRepository } from '../data/repositories/user-repository';

export class AuthHelper {
    static expireIn: number = 600;
    static readonly userRepository: IUserRepository = new UserRepository();

    static signToken(accessToken: any): string {
        return sign(accessToken, process.env.NOHAI_JWT_SECRET || '', {
            algorithm: 'HS256',
            encoding: 'UTF8',
            expiresIn: this.expireIn,
        });
    }

    static hashCredentials(input: CredentialsInput): CredentialsInput {
        return new CredentialsInput({
            password: this.hashPassword(input.password),
            login: input.login,
            loginWithFb: input.loginWithFb,
        });
    }

    static hashPassword(password: string) {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }

    static hashEmail(email: string): string {
        const hashEmail = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
        return `https://s.gravatar.com/avatar/${hashEmail}`;
    }

    static verifyToken(token: string) {
        try {
            return verify(token, process.env.NOHAI_JWT_SECRET || '');
        } catch (error) {
            return undefined;
        }
    }

    static buildRefreshToken(): Observable<string> {
        return of(uuid().toString());
    }

    static comparePassords(inputPassword: string, hasedPassword: any): Observable<boolean> {
        return from(bcrypt.compare(inputPassword, hasedPassword));
    }

    static async facebookoLogin(credentials: FacebookCredentialsInput): Promise<CredentialsInput> {
        const url = `https://graph.facebook.com/${credentials.userId}?fields=id,name,email&access_token=${credentials.accessToken}`;
        return from(axios.get(url))
            .pipe(catchError((error) => of(error.response)))
            .pipe(map((response) => {
                return  new CredentialsInput({
                    login: response.data.email,
                    password: uuid().toString(),
                    loginWithFb: response.data.id,
                });
            }))
            .toPromise();
    }

    static buildAccessToken(credentials: CredentialsInput): Observable<string> {
        return this.userRepository.findOne({ login: credentials.login, enabled: true })
            .pipe(map((user) => ({
                userId: user.id,
                firstName: user.details ? user.details.firstName : '',
                lastName: user.details ? user.details.lastName : '',
            })))
            .pipe(map((token) => this.signToken(token)));
    }
}

