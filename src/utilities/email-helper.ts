import { Email } from './email';
import { of, Observable } from 'rxjs';

export class EmailHelper {

   static getRecoverPasswordEmail(email: string, link: string): Email {
        return new Email({
            to: email,
            from: process.env.NOHAI_CUSTOMER_SERVICE_EMAIL,
            subject: 'Recuperare parola NoHai',
            message: this.recoverPasswordMessage(link),
        });
    }

    static recoverPasswordSuccessfully(email: string): Observable<string> {
        return of(`Link-ul de recuperare parola s-a trimis la adresa ${email} si este valid o zi.`);
    }

     static recoverPasswordError(email: string): Observable<string> {
        return of(`Ne pare rau dar link-ul de recuperare parola la adresa ${email} nu s-a trimis.
                   Va rugam verificati si incercati din nou!`);
    }

    private static recoverPasswordMessage(link: string): string {
        return `Pentru a recupera parola va rugam accesati link-ul de mai jos. Va multumim. ${link} `;
    }

}
