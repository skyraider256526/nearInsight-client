import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "app/store";
import { userSignIn } from "./user.thunk";

interface UserState {
  currentUser: any;
  error: any;
}

//TODO:Get the type of current user
const initialState: UserState = { currentUser: null, error: null };

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      setCurrentUser: (state, action: PayloadAction<any>) => {
        state.currentUser = action.payload;
      },
      signInSuccess: (state, action: PayloadAction<any>) => {
        state.currentUser = action.payload;
      },
      signInFailure: (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      },
    },
    extraReducers: builder => {
      builder.addCase(userSignIn.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      });
    },
  }),
  { setCurrentUser, signInFailure, signInSuccess } = userSlice.actions,
  selectCurrentUser = (state: RootState) => state.user.currentUser;

export default userSlice.reducer;
