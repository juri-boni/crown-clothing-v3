import { createContext, useEffect, useReducer } from "react";

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

/*************************************/
/*************************************/

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
  SET_USER_NAME: "SET_USER_NAME",
};

const userReducer = (state, action) => {
  console.log("dispatched");
  console.log(action);
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    case USER_ACTION_TYPES.SET_USER_NAME:
      return {
        ...state,
        userName: payload,
      };

    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

const INITIAL_STATE = {
  currentUser: null,
  userName: "",
};

export const UserProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null);
  // const [userName, setUserName] = useState("");
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const { currentUser, userName } = state;

  const setCurrentUser = (user) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
  };

  const setUserName = (userName) => {
    dispatch({ type: USER_ACTION_TYPES.SET_USER_NAME, payload: userName });
  };

  const value = { currentUser, setCurrentUser, userName };
  console.log(currentUser);
  console.log(`User Name: ${userName}`);

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
