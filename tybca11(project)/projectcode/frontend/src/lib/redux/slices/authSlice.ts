import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  userData: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isLogin = action.payload.isLogin;
      state.userData = action.payload.userData;
    },
    makeAuthEmpty: (state) => {
      state.isLogin = false;
      state.userData = null;
    },
    onlyUpdateOrganiserData: (state, action) => {
      if (state.userData) state.userData.data.organiserData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth, makeAuthEmpty, onlyUpdateOrganiserData } =
  authSlice.actions;

export default authSlice.reducer;
