import { sign, verify, decode } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { CredentialsInput } from '../business/models/inputs/credentials-input';
import { Observable, of, from } from 'rxjs';
import uuid = require('uuid');

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

    static verifyToken(token: string): boolean {
        try {
            const payload = verify(token, process.env.NOHAI_JWT_SECRET || '');
            console.log(payload);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static decodeToken(token: string) {
        return decode(token);
    }

    static buildRefreshToken(): Observable<string> {
        return of(uuid().toString());
    }

     static comparePassords(inputPassword: string, hasedPassword: any): Observable<boolean> {
         return from(bcrypt.compare(inputPassword, hasedPassword));
    }

}

