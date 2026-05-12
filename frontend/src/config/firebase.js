import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB1sqED4ct7lWhVh-3PEVXZJ-AIrSYdNKs",
  authDomain: "shopeasy-e-commerce-64eb7.firebaseapp.com",
  projectId: "shopeasy-e-commerce-64eb7",
  storageBucket: "shopeasy-e-commerce-64eb7.firebasestorage.app",
  messagingSenderId: "8855462069",
  appId: "1:8855462069:web:8f0516664ca63d3b575efc",
  measurementId: "G-722YFTMJQG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
