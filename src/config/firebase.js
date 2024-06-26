import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const api_key = process.env.REACT_APP_API_KEY;
const firebaseConfig = {
  apiKey: api_key,
  authDomain: "ib-homes-db0f8.firebaseapp.com",
  projectId: "ib-homes-db0f8",
  storageBucket: "ib-homes-db0f8.appspot.com",
  messagingSenderId: "818455866744",
  appId: "1:818455866744:web:cb7611bcf956a7847f2c8d",
};


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const dataBase = getFirestore(app)
export const storage = getStorage(app)
