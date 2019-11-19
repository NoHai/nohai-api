import { Observable, throwError, iif, of } from 'rxjs';
import { CredentialsInput } from '../models/inputs/credentials-input';
import { Credentials } from '../models/results/credentials';
import { IUserRepository } from '../repositories/i-user-repository';
import { ICreateUser } from './i-create-user';
import { flatMap, catchError, map } from 'rxjs/operators';
import { Errors } from '../../utilities/errors';
import { EmailService } from '../../services/email-service';
import { EmailHelper } from '../../utilities/email-helper';

export class CreateUser implements ICreateUser {
    constructor(private userRepository: IUserRepository,
                private emailService: EmailService) {
    }

    execute(input: CredentialsInput): Observable<Credentials> {
        return this.userRepository.findOne({ login: input.login })
            .pipe(catchError(() => of(undefined)))
            .pipe(flatMap((user) => iif(() => user !== undefined,
                this.sendError(user),
                this.userRepository.insert(input))))
            .pipe(map((credentials) => {
                this.sendConfirmEmail(credentials);
                return credentials;
            }));
    }

    private sendConfirmEmail(credentials: Credentials) {
        const email = EmailHelper.getConfirmationEmail(credentials.login);
        return of(this.emailService.sendEmail(email));
    }

    private sendError(user: any) {
        return user.enabled === true
            ? throwError(new Error(Errors.AlreadyRegisterd))
            : throwError(new Error(Errors.InactiveAccount));
    }
}
