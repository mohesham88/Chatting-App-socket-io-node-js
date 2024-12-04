import { firebaseConfig } from "config";

import admin from "firebase-admin";

/* const process.env = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT as string
); */

/* onst firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(process.env as admin.process.env),
});
 */

const initFirebase = () => {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.PROJECT_ID,
      clientEmail: process.env.CLIENT_EMAIL,
      privateKey: (process.env.PRIVATE_KEY as string).replace(/\\n/g, "\n"),
    }),
  });
};

export { initFirebase, admin, firebaseConfig };
