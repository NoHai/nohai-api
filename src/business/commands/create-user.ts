import { Observable, throwError, iif, of } from 'rxjs';
import { CredentialsInput } from '../models/inputs/credentials-input';
import { Credentials } from '../models/results/credentials';
import { IUserRepository } from '../repositories/i-user-repository';
import { ICreateUser } from './i-create-user';
import { flatMap, catchError, map } from 'rxjs/operators';
import { Errors } from '../../utilities/errors';
import { EmailService } from '../../services/email-service';
import { AuthHelper } from '../../utilities/auth-helper';
import { EmailHelper } from '../../utilities/email-helper';

export class CreateUser implements ICreateUser {
    constructor(private userRepository: IUserRepository,
                private emailService: EmailService) {
    }

    execute(input: CredentialsInput): Observable<Credentials> {
        return this.userRepository.byCredentials(input.login)
            .pipe(catchError(() => of(undefined)))
            .pipe(flatMap((user) => iif(() => user !== undefined,
                throwError(new Error (Errors.AlreadyRegisterd)),
                this.userRepository.insert(input))))
            .pipe(map((credentials) => {
                this.sendConfirmEmail(credentials);
                return credentials;
            }));
    }

    private sendConfirmEmail(credentials: Credentials) {
        const date = new Date();
        date.setHours(date.getHours() + 24);

        const token = {
            email: credentials.login,
            expireDate: date,
        };

        const confirmLink = `https://no-hai.ro/email-validation/${AuthHelper.signToken(token)}`;
        const email = EmailHelper.getConfirmationEmail(credentials.login, confirmLink);

        return of(this.emailService.sendEmail(email));
    }
}
