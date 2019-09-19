import { IRecoverPassword } from './i-recover-password';
import { Observable, from, iif } from 'rxjs';
import { EmailService } from '../../services/email-service';
import { EmailHelper } from '../../utilities/email-helper';
import { flatMap, tap } from 'rxjs/operators';

export class RecoverPassword implements IRecoverPassword {
    constructor(private readonly emailService: EmailService) {
    }

    execute(input: string): Observable<string> {
        console.log(input);
        const recoveryLink = 'test somehow';
        const email = EmailHelper.getRecoverPasswordEmail(input, recoveryLink);

        return from(this.emailService.sendEmail(email))
            .pipe(flatMap((emailResult) => iif(() => emailResult[0].statusCode === 202,
                                             EmailHelper.recoverPasswordSuccessfully(input),
                                             EmailHelper.recoverPasswordError(input)),
            ));
    }

}
