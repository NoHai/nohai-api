import admin from 'firebase-admin';
import { ServiceAccount } from './service-account';

export async function SendNotification(tokens: any, body: string, title: string): Promise<boolean> {
  const serviceAccount: any = ServiceAccount.getFirebabaseConfig();
  let messageSent: boolean = false;

  if (!admin.apps.length) {
    await admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://nohai-pushnotification.firebaseio.com',
    });
  }
  const notification = {
    notification: {
      body,
      title,
      icon: 'https://no-hai.ro/assets/app-icon.png',
      clickAction: `https://no-hai.ro/notification`,
    },
  };

  admin.messaging().sendToDevice(tokens, notification)
    .then((response) => {
      console.log('Success', JSON.stringify(response));
      messageSent = true;
    })
    .catch((error) => {
      console.log('Error sending message:', error);
      messageSent = false;
    });

  return messageSent;
}


