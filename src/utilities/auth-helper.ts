import { sign, verify } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { CredentialsInput } from '../business/models/inputs/credentials-input';
import { Observable, of, from } from 'rxjs';
import uuid = require('uuid');
import { FacebookCredentialsInput } from '../business/models/inputs/facebook-credentials-input';

export class AuthHelper {

    static  signToken(accessToken: any): string {
        return sign(accessToken, process.env.NOHAI_JWT_SECRET || '', {
            algorithm: 'HS256',
            encoding: 'UTF8',
        });
    }

    static hashCredentials(input: CredentialsInput): CredentialsInput {
        const salt = bcrypt.genSaltSync(10);
        const hash =  bcrypt.hashSync(input.password, salt);

        return new CredentialsInput({ password: hash, login: input.login });
    }

    static hashFacebookCredentials(input: FacebookCredentialsInput): FacebookCredentialsInput {
        const generatedPassword = uuid().toString();
        return new FacebookCredentialsInput({ password: generatedPassword, login: input.login });
    }

    static verifyToken(token: string) {
        try {
           return verify(token, process.env.NOHAI_JWT_SECRET || '');
        } catch (error) {
             return null;
        }
    }

    static buildRefreshToken(): Observable<string> {
        return of(uuid().toString());
    }

     static comparePassords(inputPassword: string, hasedPassword: any): Observable<boolean> {
         return from(bcrypt.compare(inputPassword, hasedPassword));
    }

}

