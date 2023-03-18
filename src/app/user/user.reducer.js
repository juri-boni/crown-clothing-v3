import { createSlice } from "@reduxjs/toolkit";

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
    },
    setUserName(state, action) {
      state.userName = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;
export const { setUserName } = userSlice.actions;

export const userReducer = userSlice.reducer;
