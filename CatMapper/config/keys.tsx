import Firebase from "firebase";
import ENV from "./env";

const firebaseConfig = {
  apiKey: ENV.FIREBASE_API,
  authDomain: ENV.AUTHDOMAIN,
  databaseURL: ENV.DATABASE_URL,
  projectId: "cat-mapper",
  storageBucket: "cat-mapper.appspot.com",
  messagingSenderId: "888826043099",
  appId: "1:888826043099:web:5459b640c2d31671320afe",
  measurementId: "G-8676V7XPHY",
};

const app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();
