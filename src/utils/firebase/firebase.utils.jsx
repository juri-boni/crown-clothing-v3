import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  ProviderId,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByB_r8GEN9Xau9_2iPhcTsLVO8pnuN_ks",
  authDomain: "crw-db-v3.firebaseapp.com",
  projectId: "crw-db-v3",
  storageBucket: "crw-db-v3.appspot.com",
  messagingSenderId: "461003384921",
  appId: "1:461003384921:web:967ae511657602e7a76948",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
