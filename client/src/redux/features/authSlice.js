import { createApi } from "@reduxjs/toolkit/query/react";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createApi({
  name: "auth",
  initialState,
  reducer: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));

      const expirationTime = new Date().getTime() + 3 * 24 * 60 * 60 * 1000;
      localStorage.getItem("expirationTime", expirationTime);
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("expirationTime");
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = authSlice.action;

export default authSlice.reducer;
