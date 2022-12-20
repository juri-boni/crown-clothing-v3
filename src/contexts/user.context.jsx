import { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  getUserDataFromFirestore,
  // signOutUser,
} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
  userName: "",
  setUserName: () => {},
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userName, setUserName] = useState("");
  const value = { currentUser, setCurrentUser, userName };
  // console.log(currentUser);

  useEffect(() => {
    const getUserData = async (user) => {
      const userData = await getUserDataFromFirestore(user);
      const fullName = userData?.displayName;
      setUserName(fullName);
    };
    getUserData(currentUser);
  }, [currentUser]);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      // console.log(user);
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
