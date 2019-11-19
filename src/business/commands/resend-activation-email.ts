import { IResendActivationEmail } from './i-resend-activation-email';
import { Observable, iif, of, throwError, from } from 'rxjs';
import { IUserRepository } from '../repositories/i-user-repository';
import { flatMap } from 'rxjs/operators';
import { EmailHelper } from '../../utilities/email-helper';
import { EmailService } from '../../services/email-service';
import { Errors } from '../../utilities/errors';

export class ResendActivationEmail implements IResendActivationEmail {

    constructor(private readonly userRepository: IUserRepository,
                private readonly emailService: EmailService) { }

    execute(input: string): Observable<boolean> {
        return this.checkIfExists(input)
            .pipe(flatMap((exists) => iif(() => exists,
                this.sendActivationEmail(input),
                throwError(new Error(Errors.NotRegistered)))));
    }

    private checkIfExists(login: string): Observable<boolean> {
        return this.userRepository.find({ login })
            .pipe(flatMap((result) => iif(() => result === undefined, of(false), (of(true)))));
    }

    private sendActivationEmail(login: string) {
        const email = EmailHelper.getConfirmationEmail(login);
        return from(this.emailService.sendEmail(email))
            .pipe(flatMap((emailResult) => iif(() => !!emailResult && emailResult[0].statusCode === 202,
                of(true), of(false))));
    }

}
