export class ServiceAccount {
  static getFirebabaseConfig(): any {
    const isDevelopment = process.env.environment === 'development';
    const firebasePrivateKey = isDevelopment
      ? process.env.NOHAI_FIREBASE_PRIVATE_KEY
      : JSON.parse(process.env.NOHAI_FIREBASE_PRIVATE_KEY as string);

    console.log(firebasePrivateKey);

    return {
      type: 'service_account',
      project_id: 'nohai-pushnotification',
      private_key_id: process.env.NOHAI_FIREBASE_PRIVATE_KEY_ID,
      private_key: firebasePrivateKey,
      client_email: process.env.NOHAI_FIREBASE_CLIENT_EMAIL,
      client_id: process.env.NOHAI_FIREBASE_CLIENT_ID,
      client_x509_cert_url: process.env.NOHAI_FIREBASE_CERT_URL,
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    };
  }
}
