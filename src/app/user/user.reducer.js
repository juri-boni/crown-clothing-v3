import { createSlice } from "@reduxjs/toolkit";
import { USER_ACTION_TYPES } from "./user.types";

const USER_INITIAL_STATE = {
  currentUser: null,
  userName: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: USER_INITIAL_STATE,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
      state.setUserName = action.payload;
    },
  },
});

export const { setCurrentUser, setUserName } = userSlice.actions;

export const userReducer = userSlice.reducer;
