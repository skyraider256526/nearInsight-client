import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "firebase";

import { createUserProfileDocument } from "services/firebase";
import { signInFailure, signInSuccess } from "./userSlice";

// export async function getSnapshotFromUserAuth(userAuth: User) {
//   try {
//     const userRef = await createUserProfileDocument(userAuth),
//       userSnapshot = await userRef.get();
//     console.log(userSnapshot);
//     dispatch(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
//   } catch (error) {
//     dispatch(signInFailure(error));
//   }
// }
export const userSignIn = createAsyncThunk(
  "users/signIn",
  async (userAuth: User, thunkAPI) => {
    const userRef = await createUserProfileDocument(userAuth),
      userSnapshot = await userRef.get();
    return { id: userSnapshot.id, ...userSnapshot.data() };
  }
);
