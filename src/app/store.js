/******************************************************************************* */
//REDUX WITH TOOLKIT
/******************************************************************************* */

import { configureStore } from "@reactjs/toolkit";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

const middleWares = [process.env.NODE_ENV === "development" && logger].filter(
  Boolean
);

export const store = configureStore({
  reducer: rootReducer,
  // middleware: middleWares,
});

/******************************************************************************* */
//REDUX WITHOUT TOOLKIT
/******************************************************************************* */

// import {
//   compose,
//   legacy_createStore as createStore,
//   applyMiddleware,
// } from "redux";

// import { persistStore, persistReducer } from "redux-persist";
// import logger from "redux-logger";
// import thunk from "redux-thunk";

// import { rootReducer } from "./root-reducer";
// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//   key: "root",
//   storage,
//   blacklist: ["user"],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const middlewares = [
//   process.env.NODE_ENV === "development" && logger,
//   thunk,
// ].filter(Boolean);

// const composeEnhancer =
//   (process.env.NODE_ENV !== "production" &&
//     window &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose;

// const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

// export const store = createStore(
//   persistedReducer,
//   undefined,
//   composedEnhancers
// );

// export const persistor = persistStore(store);
