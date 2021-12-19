import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import {
  DB_APIKEY,
  DB_AUTHDOMAIN,
  DB_URL,
  DB_PROJECTID,
  DB_BUCKET,
  DB_MESSAGINGSENDERID,
  DB_APPID,
  DB_MEASUREMENTID,
} from "@env";

const firestoreConfig = {
  apiKey: DB_APIKEY,
  authDomain: DB_AUTHDOMAIN,
  databaseURL: DB_URL,
  projectId: DB_PROJECTID,
  storageBucket: DB_BUCKET,
  messagingSenderId: DB_MESSAGINGSENDERID,
  appId: DB_APPID,
  measurementId: DB_MEASUREMENTID,
};

export const firebaseApp = initializeApp(firestoreConfig);
export const db = getFirestore();
export const storage = getStorage(firebaseApp);