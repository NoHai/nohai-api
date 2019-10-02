export class ServiceAccount {

    static getFirebabaseConfig(): any {
        return {
            type: 'service_account',
            project_id: 'nohai-pushnotification',
            private_key_id: process.env.NOHAI_FIREBASE_PRIVATE_KEY_ID,
            private_key: JSON.parse(process.env.NOHAI_FIREBASE_PRIVATE_KEY as string),
            client_email: process.env.NOHAI_FIREBASE_CLIENT_EMAIL,
            client_id: process.env.NOHAI_FIREBASE_CLIENT_ID,
            auth_uri: 'https://accounts.google.com/o/oauth2/auth',
            token_uri: 'https://oauth2.googleapis.com/token',
            auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
            // tslint:disable-next-line:max-line-length
            client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xzfb6%40nohai-pushnotification.iam.gserviceaccount.com',
        };
    }
}
