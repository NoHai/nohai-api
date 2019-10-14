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
        const userFlow  = this.userRepository.byCredentials(input);

        const recoveryLinkFlow = this.userRepository.byCredentials(input)
                            .pipe(catchError(() => throwError(new Error(Errors.NotRegistered))))
                            .pipe(map(() => ({
                                email: input,
                                expireDate: this.getExpiryDate(),
                            })))
                            .pipe(map((token) => `https://no-hai.ro/reset-password/${AuthHelper.signToken(token)}`));

        return zip(userFlow, recoveryLinkFlow)
                        .pipe(map((result) => EmailHelper.getRecoverPasswordEmail(result[0], input, result[1])))
                        .pipe(flatMap((email) => from(this.emailService.sendEmail(email))))
                        .pipe(flatMap((emailResult) => iif(() => emailResult[0].statusCode === 202,
                                     EmailHelper.recoverPasswordSuccessfully(input),
                                     EmailHelper.recoverPasswordError(input))));
    }

    private getExpiryDate() {
        const date = new Date();
        return date.setHours(date.getHours() + 12);
    }

}
