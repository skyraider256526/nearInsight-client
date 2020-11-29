import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "firebase";
import axios from "axios";

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
    axios.defaults.headers.common = {
      Authorization: `Bearer ${await userAuth.getIdToken()}`,
    };
    console.log(await userAuth.getIdToken());

    if (process.env.REACT_APP_FIREBASE_FUNCTIONS) {
      const url = process.env.REACT_APP_FIREBASE_FUNCTIONS + "user/create";
      axios
        .post(
          "http://localhost:5001/near-insight/us-central1/api/user/create",
          { userAuth }
        )
        .then(res => {
          console.log(res, "then");
          const userSnapshot = res;
          return {
            token: userAuth.getIdToken(),
            ...userSnapshot.data,
          };
        })
        .catch(error => console.error(error));
      //TODO:make axios request for user data
      // userSnapshot = await userRef.get();
      //TODO: This to get the token for api testing
    }
  }
);
