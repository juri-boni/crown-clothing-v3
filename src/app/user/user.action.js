import { USER_ACTION_TYPES } from "./user.types";
import { createAction } from "../../utils/reducers/reducers.utils";

export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

export const setUserName = (userName) =>
  createAction(USER_ACTION_TYPES.SET_USER_NAME, userName);
