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
  getDoc, //getDoc() query gets data of a specific document from collection based on references mentioned in the doc() method
  setDoc, //to set documents
  collection, //to get a collection reference
  writeBatch, //to batch objects in a collection
  query,
  getDocs, //getDocs() gets data from collection based references mentioned in the doc() method
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

//CREATING COLLECTIONS:

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey); // (if it doesn't exist, firebase will create it automatically)
  //TRANSACTION (successfull unit of work to a database)
  const batch = writeBatch(db);
  //attach CRUD to batch
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log("done");
};

//RETRIEVING COLLECTIONS AND DOCUMENTS

//getting categories collection
export const getCategoriesAndDocuments = async (collectionName) => {
  const collectionRef = collection(db, collectionName);
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
  // const categoryMap = querySnapshot.docs

  // return categoryMap;
};

//getting user collection
export const getUserDataFromFirestore = async (user) => {
  if (!user) return;
  const docRef = doc(db, "users", user.uid);
  // console.log(user.uid);

  try {
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return;
    return docSnap.data();
  } catch (err) {
    console.log(err);
  }
};

//CREATING USERS

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = {}
) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  // console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);

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
      console.error("error creating the user", err.message);
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
