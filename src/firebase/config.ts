import { initializeApp, getApp, getApps, FirebaseApp } from "firebase/app";
import * as appAuth from "firebase/auth";
import {
  getFirestore,
  serverTimestamp,
  query,
  collection,
  where,
  getDocs,
  enableIndexedDbPersistence,
} from "firebase/firestore";
import {
  getDatabase,
  serverTimestamp as dbServerTimestamp,
  query as dbQuery,
  ref,
  set,
  onValue,
} from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

// if (process.env.NODE_ENV !== "production") {
//   import("firebase/analytics").then(() => {});
// }

interface IFirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string | "";
}

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
    ? process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
    : "",
};

let app: FirebaseApp;

if (getApps().length) {
  app = getApp();
} else {
  app = initializeApp(firebaseConfig as IFirebaseConfig);
}

// Initialize Firebase Auth, Firestore, Storage and Functions
const auth = appAuth.getAuth(app);
const projectDatabase = getDatabase(app);
const projectFirestore = getFirestore(app);
const projectStorage = getStorage(app);
const projectFunctions = getFunctions(app);
const timestamp = serverTimestamp;
const dbTimestamp = dbServerTimestamp;

enableIndexedDbPersistence(projectFirestore).catch((err) => {
  if (err.code === "failed-precondition") {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    // ...
  } else if (err.code === "unimplemented") {
    // The current browser does not support all of the
    // features required to enable persistence
    // ...
  }
});

export default app;
export {
  auth,
  appAuth,
  projectDatabase,
  projectFirestore,
  projectStorage,
  projectFunctions,
  query,
  collection,
  where,
  getDocs,
  dbQuery,
  ref,
  set,
  onValue,
  timestamp,
  dbTimestamp,
};
