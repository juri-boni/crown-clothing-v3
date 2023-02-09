import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";

import { persistStore, persistReducer } from "redux-persist";

import logger from "redux-logger";

import { rootReducer } from "./root-reducer";
import storage from "redux-persist/lib/storage";

// const loggerMiddleware = (store) => (next) => (action) => {
//   if (!action.type) {
//     return next(action);
//   }

//   console.log("type:", action.type);
//   console.log("payload:", action.payload);
//   console.log("currentState", store.getState());

//   next(action);

//   console.log("next state", store.getState());
// };

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [logger];

const composedEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
