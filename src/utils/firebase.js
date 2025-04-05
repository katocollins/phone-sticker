import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHwtpgXau4uXnurMnA-oZqEpxV6DGDun8",
  authDomain: "phone-sticker.firebaseapp.com",
  projectId: "phone-sticker",
  storageBucket: "phone-sticker.firebasestorage.app",
  messagingSenderId: "427631163616",
  appId: "1:427631163616:web:fa06f5c68088f97ceff885",
  measurementId: "G-S48F5TL90T",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
