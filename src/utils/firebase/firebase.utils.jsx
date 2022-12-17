import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged, //Observer
} from "firebase/auth";

import {
  getFirestore,
  doc, //to retrieve documents instance from firestore
  getDoc, //to get documents data
  setDoc, //to set documents data
} from "firebase/firestore";

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

//----------------------------------------------------------//
//SIGN IN WITH GOOGLE//
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

//*************************************************//
//FIRESTORE

export const db = getFirestore();
//CREATING USERS

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = {}
) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  // check if user data exists:
  // if not: create/set document with data from userAuth in the db collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (err) {
      console.log("error creating the user", err.message);
    }
  }

  //if yes: return userDocRef
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

//SIGN OUT
export const signOutUser = () => signOut(auth);

//OBSERVER LISTENER -->  [listener: 3 methods (next - error - complete)]

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

/**
 * {
 * next: callback
 * }
 *
 *
 */
