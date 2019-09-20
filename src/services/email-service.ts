import { Email } from '../utilities/email';
import emailSender from '@sendgrid/mail';

export class EmailService {

    constructor() {
        emailSender.setApiKey(process.env.NOHAI_SENDGRID_API_KEY || '');
    }

    async sendEmail(email: Email) {
        const result = await emailSender.send(email, false);
        return result;
    }

    async sendMultipleEmails(emails: Email[]) {
        const result = await emailSender.send(emails);
        return result;
    }
}

