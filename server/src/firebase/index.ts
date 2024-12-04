import { firebaseConfig } from "config";

import admin from "firebase-admin";

import ServiceAccount from "./serviceAccount.json";


/* onst firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(ServiceAccount as admin.ServiceAccount),
});
 */


const initFirebase = () => {
  admin.initializeApp({
    credential: admin.credential.cert(ServiceAccount as admin.ServiceAccount),
  });
} 


export {
  initFirebase,
  admin,
  firebaseConfig,
  ServiceAccount,
}