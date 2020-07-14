import { IRecoverPassword } from './i-recover-password';
import { Observable, from, iif, throwError, zip } from 'rxjs';
import { EmailService } from '../../services/email-service';
import { EmailHelper } from '../../utilities/email-helper';
import { flatMap, catchError, map } from 'rxjs/operators';
import { IUserRepository } from '../repositories/i-user-repository';
import { AuthHelper } from '../../utilities/auth-helper';
import { Errors } from '../../utilities/errors';

export class RecoverPassword implements IRecoverPassword {
    constructor(private readonly emailService: EmailService,
                private readonly userRepository: IUserRepository) {
    }

    execute(input: string): Observable<string> {
        return this.userRepository.findOne({ login: input, enabled: true })
            .pipe(catchError(() => throwError(new Error(Errors.NotRegistered))))
            .pipe(flatMap((user) => this.sendRecoverEmail(user)));
    }

    private getExpiryDate() {
        const date = new Date();
        return date.setHours(date.getHours() + 12);
    }

    private sendRecoverEmail(user: any) {
        const token = {
            email: user.login,
            expireDate: this.getExpiryDate(),
        };
        const link = `https://no-hai.ro/reset-password/${AuthHelper.signToken(token)}`;
        const email = EmailHelper.getRecoverPasswordEmail(user, user.login, link);

        return from(this.emailService.sendEmail(email))
            .pipe(flatMap((emailResult) => iif(() => !!emailResult && emailResult[0].statusCode === 202,
                EmailHelper.recoverPasswordSuccessfully(user.login),
                EmailHelper.recoverPasswordError(user.login))));

    }

}
