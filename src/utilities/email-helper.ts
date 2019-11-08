import { Email } from './email';
import { of, Observable, throwError } from 'rxjs';
import { User } from '../business/models/results/user';
import mjml2html from 'mjml';
import { Errors } from './errors';

export class EmailHelper {

    static getRecoverPasswordEmail(user: User | undefined, email: string, link: string): Email | undefined {
        if (!!user) {
            return new Email({
                to: email,
                from: process.env.NOHAI_CUSTOMER_SERVICE_EMAIL,
                subject: 'Recuperare parola NoHai',
                text: this.recoverPasswordMessage(link),
                html: this.getRecoveryEmailHtml(user, link),
            });
        } else {
            throwError(new Error(Errors.UnableToSendEmail));
        }
    }

    static getAllSpotsOccupiedEmails(users: any[], eventTitle: string): Email[] {
        const emails = users.map((user) => {
            return new Email({
                to: user.email,
                from: process.env.NOHAI_CUSTOMER_SERVICE_EMAIL,
                subject: 'Locuri ocupate',
                text: this.allSpotsOccupiesMessage(eventTitle),
                html: this.getOccupiedSpotsEmailHtml(user.user, eventTitle),
            });

        });

        return emails;
    }

    static getCancelEventEmails(users: any[], eventTitle: string): Email[] {
        const emails = users.map((user) => {
            return new Email({
                to: user.email,
                from: process.env.NOHAI_CUSTOMER_SERVICE_EMAIL,
                subject: 'Anulare eveniment',
                text: this.cancelEventMessage(eventTitle),
                html: this.getCancelEventEmailHtml(user.user, eventTitle),
            });

        });

        return emails;
    }

    static getLeaveEventEmail(user: any, leaveUser: any, eventTitle: string) {
        return new Email({
            to: user.login,
            from: process.env.NOHAI_CUSTOMER_SERVICE_EMAIL,
            subject: 'Participare anulata',
            text: this.leaveEventMessage(leaveUser, eventTitle),
            html: this.getLeaveEventEmailHtml(user, leaveUser, eventTitle),
        });
    }

    static getKickoutUserEmail(kickoutUser: any, eventTitle: string) {
        return new Email({
            to: kickoutUser.login,
            from: process.env.NOHAI_CUSTOMER_SERVICE_EMAIL,
            subject: 'Participare respinsa',
            text: this.kickoutUserMessage(eventTitle),
            html: this.getKickoutEmailHtml(kickoutUser, eventTitle),
        });
    }

    static getConfirmationEmail(emailAddress: string, link: string) {
        return new Email({
            to: emailAddress,
            from: process.env.NOHAI_CUSTOMER_SERVICE_EMAIL,
            subject: 'Confirmare cont NoHai',
            text: this.confirmMessage(link),
            html: this.getConfirmationEmailHtml(link),
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

    private static allSpotsOccupiesMessage(eventTitle: string): string {
        return `Ne pare rau sa te anuntam, dar toate locurile la evenimentul ${eventTitle} au fost ocupate.`;
    }

    private static cancelEventMessage(eventTitle: string): string {
        return `Evenimentul ${eventTitle} a fost anulat.`;
    }

    private static leaveEventMessage(leaveUser: any, eventTitle: string): string {
        return `${leaveUser.firstName} ${leaveUser.lastName} nu mai ajunge la evenimentul ${eventTitle}.`;
    }

    private static kickoutUserMessage(eventTitle: string): string {
        return `Ne pare rau, dar administratorul evenimentului ${eventTitle}, te-a eliminat`;
    }

    private static confirmMessage(link: string): string {
        return `Pentru a confirma contul NoHai creat, acceseaza link-ul ${link}.`;
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

    private static getCancelEventEmailHtml(user: User, eventTitle: string): string {
        return mjml2html(`
        <mjml>
        <mj-body>
        <mj-section>
            <mj-column>
            <mj-text font-family="helvetica">Salut ${user.firstName} ${user.lastName},</mj-text>
            <mj-text font-family="helvetica">Ne pare rau sa te anuntam,
            dar ${eventTitle} a fost anulat.</mj-text>
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

    private static getLeaveEventEmailHtml(user: User, leaveUser: User, eventTitle: string): string {
        return mjml2html(`
        <mjml>
        <mj-body>
        <mj-section>
            <mj-column>
            <mj-text font-family="helvetica">Salut ${user.firstName} ${user.lastName},</mj-text>
            <mj-text font-family="helvetica">Participantul ${leaveUser.firstName} ${leaveUser.lastName}
            nu mai poate participa la ${eventTitle}.</mj-text>
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

    private static getKickoutEmailHtml(kickoutUser: User, eventTitle: string): string {
        return mjml2html(`
        <mjml>
        <mj-body>p
        <mj-section>
            <mj-column>
            <mj-text font-family="helvetica">Salut ${kickoutUser.firstName} ${kickoutUser.lastName},</mj-text>
            <mj-text font-family="helvetica">Ne pare rau sa te anuntam dar administratorul evenimentului
                 ${eventTitle} te-a retras din activitate.</mj-text>
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

    private static getConfirmationEmailHtml(link: string) {
        return mjml2html(`
        <mjml>
        <mj-body>p
        <mj-section>
            <mj-column>
            <mj-text font-family="helvetica">No hai cu noi,</mj-text>
            <mj-text font-family="helvetica">Pentru a confirma contul tau te rugam sa accesezi link-ul de mai jos. </mj-text>
            <mj-text>
              <a href="${link}">Confirmare cont</a>
            </mj-text>
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
