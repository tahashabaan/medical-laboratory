import admin from 'firebase-admin';
import { env } from './env';

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert({
//       projectId: env.firebase.projectId,
//       clientEmail: env.firebase.clientEmail,
//       privateKey: env.firebase.privateKey,
//     }),
//     storageBucket: env.firebase.storageBucket,
//   });
// }

export const firebaseAdmin = {};