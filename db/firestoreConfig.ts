import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

import {
  DB_APIKEY,
  DB_AUTHDOMAIN,
  DB_PROJECTID,
  DB_BUCKET,
  DB_MESSAGINGSENDERID,
  DB_APPID,
} from '@env'

const firestoreConfig = {
  apiKey: DB_APIKEY,
  authDomain: DB_AUTHDOMAIN,
  projectId: DB_PROJECTID,
  storageBucket: DB_BUCKET,
  messagingSenderId: DB_MESSAGINGSENDERID,
  appId: DB_APPID
}

export const firebaseApp = initializeApp(firestoreConfig)
export const db = getFirestore()
export const storage = getStorage(firebaseApp)
