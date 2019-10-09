import { sign, verify } from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { CredentialsInput } from '../business/models/inputs/credentials-input';
import { Observable, of, from } from 'rxjs';
import uuid = require('uuid');
import { FacebookCredentialsInput } from '../business/models/inputs/facebook-credentials-input';
import crypto from 'crypto';
import request from 'request';

export class AuthHelper {
    static expireIn: number = 600;

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

    static hashFacebookCredentials(input: any): FacebookCredentialsInput {
        const generatedPassword = uuid().toString();
        return new FacebookCredentialsInput({ password: generatedPassword, login: input.login });
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

    static facebookoLogin(credentials: FacebookCredentialsInput): any {
        let fbcredentials: any = null;
        const uri = `https://graph.facebook.com/${credentials.userId}?fields=id,name,email&access_token=${credentials.accessToken}`;

        request(uri, (response) => {
            console.log(response);

            const something  =  response.toJSON();
            console.log(something);

            response.on('data', (data: any) => {
                fbcredentials = data;
            });
        });

        return fbcredentials;
    }
}

