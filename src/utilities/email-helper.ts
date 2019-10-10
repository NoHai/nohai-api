import { Email } from './email';
import { of, Observable } from 'rxjs';
import { User } from '../business/models/results/user';
import mjml2html from 'mjml';

export class EmailHelper {

    static getRecoverPasswordEmail(user: User, email: string, link: string): Email {
        return new Email({
            to: email,
            from: process.env.NOHAI_CUSTOMER_SERVICE_EMAIL,
            subject: 'Recuperare parola NoHai',
            text: this.recoverPasswordMessage(link),
            html: this.getRecoveryEmailHtml(user, link),
        });
    }

    static getAllSpotsOccupiedEmails(users: any[], eventTitle: string): Email[] {
        const emails = users.map((user) => {
            return new Email({
                to: user.email,
                from: process.env.NOHAI_CUSTOMER_SERVICE_EMAIL,
                subject: 'Locuri ocupate',
                text: this.allSpotsOccupiesMessage(eventTitle),
                html: this.getOccupiedSpotsEmailHtml(user, eventTitle),
            });

        });

        return emails;
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

    private static allSpotsOccupiesMessage(eventTitle: string): string {
        return `>Ne pare rau sa te anuntam, dar toate locurile la evenimentul ${eventTitle} au fost ocupate.`;
    }

    private static getRecoveryEmailHtml(user: User, link: string): string {
        return mjml2html(`
        <mjml>
        <mj-body>
        <mj-section>
            <mj-column>
            <mj-text  font-family="helvetica">Salut ${user.firstName} ${user.lastName},</mj-text>
            <mj-text  font-family="helvetica">Mai jos se alfla link-ul pentru resetarea parolei atasata contului NoHai</mj-text>
            <mj-text>
                <a href="${link}">Resetare parola</a>
            </mj-text>
            <mj-text  font-family="helvetica">Iti multumim</mj-text>
            </mj-column>
        </mj-section>
        <mj-section>
        <mj-column>
            <mj-text  font-family="helvetica">Echipa NoHai</mj-text>
        </mj-column>
        </mj-section>
        </mj-body>
        </mjml>
        `).html;
    }

    private static getOccupiedSpotsEmailHtml(user: User, eventTitle: string): string {
        return mjml2html(`
        <mjml>
        <mj-body>
        <mj-section>
            <mj-column>
            <mj-text font-family="helvetica">Salut ${user.firstName} ${user.lastName},</mj-text>
            <mj-text font-family="helvetica">Ne pare rau sa te anuntam,
            dar toate locurile la evenimentul ${eventTitle} au fost ocupate.</mj-text>
            <mj-text font-family="helvetica">Te asteptam la urmatoarele evenimente.</mj-text>
            <mj-text font-family="helvetica">Iti multumim</mj-text>
            </mj-column>
        </mj-section>
        <mj-section>
        <mj-column>
            <mj-text  font-family="helvetica">Echipa NoHai</mj-text>
        </mj-column>
        </mj-section>
        </mj-body>
        </mjml>
        `).html;
    }

}
