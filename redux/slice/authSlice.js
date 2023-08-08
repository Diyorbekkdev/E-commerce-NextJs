// import { TOKEN } from "@/const";
// import { createSlice } from "@reduxjs/toolkit";
// import { getCookie } from "cookies-next";

// const initialState = {
//   isAuth: getCookie(TOKEN) ? true : false,
//   user: null,
// };

// export const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setAuth: (state) => {
//       state.isAuth = !state.isAuth;
//     },
//     setUser: (state, { payload }) => {
//       state.user = payload;
//     },
//   },
//   extraReducers: {},
// });

// export const { reducer, actions } = authSlice;

// export const { setAuth, setUser } = actions;

// export default reducer;
