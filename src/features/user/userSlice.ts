import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "app/store";
import axios, { AxiosError } from "axios";
import { likePost, postSlice } from "features/data/postSlice";
import { useHistory } from "react-router-dom";

interface UserState {
  currentUser: any;
  errors: any;
  uiLoading: boolean;
  profileLoading: boolean;
}

// THUNK
const setAuthorizationHeader = (token: string) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
export const userLogIn = createAsyncThunk(
  "users/login",
  async (data: any, thunkAPI) => {
    const { email, password, from, history } = data;
    return await axios
      .post("/user/login", { email, password })
      .then(res => {
        console.log(res.data);
        setAuthorizationHeader(res.data.token);
        return thunkAPI.dispatch(getUserData());
      })
      .then(() => {
        history.replace(from.pathname);
      })
      .catch((err: AxiosError) => {
        console.log(err.response?.data);
        return thunkAPI.rejectWithValue(err.response?.data);
      });
  }
);
export const userSignUp = createAsyncThunk(
  "users/signUp",
  async (data: any, thunkAPI) => {
    const {
      email,
      password,
      confirmPassword,
      displayName,
      from,
      history,
    } = data;
    return await axios
      .post("/user/signup", { email, password, confirmPassword, displayName })
      .then(res => {
        console.log(res.data);
        setAuthorizationHeader(res.data.token);
        return thunkAPI.dispatch(getUserData());
      })
      .then(() => {
        history.replace(from.pathname);
      })
      .catch((err: AxiosError) => {
        console.log(err.response?.data);
        return thunkAPI.rejectWithValue(err.response?.data);
      });
  }
);

export const getUserData = createAsyncThunk(
  "getUserData",
  async (undefined, thunkAPI) => {
    const res = await axios.get("/user/detail");
    return res.data;
  }
);

export const uploadImage = (formData: File) => (dispatch: any) => {
  dispatch(setLoadingUser());
  axios
    .post("/user/image", formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};
export const logOutUser = () => (dispatch: any) => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch(setUnAuthenticated(null));
};

export const editUserDetails = userDetails => (dispatch: any) => {
  dispatch(setLoadingUser());
  axios
    .post("/user/detail", userDetails)
    .then(() => dispatch(getUserData()))
    .catch(err => console.error(err));
};

/// END: THUNK

//TODO:Get the type of current user
const initialState: UserState = {
  currentUser: {
    isAuthenticated: false,
    notifications: [],
    credentials: {},
    likes: [],
  },
  errors: {
    email: "",
    password: "",
    confirmPassword: "",
    displayName: "",
    general: "",
  },
  uiLoading: false,
  profileLoading: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      loadingUi: (state, action: PayloadAction<any>) => {
        state.uiLoading = !state.uiLoading;
      },
      setAuthenticated: (state, action) => {
        state.currentUser = { ...state.currentUser, isAuthenticated: true };
      },
      setUnAuthenticated: (state, action) => {
        state.currentUser = initialState.currentUser;
      },
      setCurrentUser: (state, action: PayloadAction<any>) => {
        state.currentUser = action.payload;
        state.profileLoading = false;
      },
      setLoadingUser: state => {
        state.profileLoading = true;
      },
      signInSuccess: (state, action: PayloadAction<any>) => {
        state.currentUser = action.payload;
      },
      signInFailure: (state, action: PayloadAction<any>) => {
        state.errors = action.payload;
      },
    },
    extraReducers: builder => {
      builder.addCase(userLogIn.pending, (state, action) => {
        state.uiLoading = true;
      });
      builder.addCase(userLogIn.fulfilled, (state, action) => {
        state.uiLoading = false;
        state.errors = initialState.errors;
      });
      builder.addCase(userLogIn.rejected, (state, action) => {
        state.uiLoading = false;
        state.errors = action.payload;
      });
      builder.addCase(userSignUp.pending, (state, action) => {
        state.uiLoading = true;
      });
      builder.addCase(userSignUp.fulfilled, (state, action) => {
        state.uiLoading = false;
        state.errors = initialState.errors;
      });
      builder.addCase(userSignUp.rejected, (state, action) => {
        state.uiLoading = false;
        state.errors = action.payload;
      });
      builder.addCase(getUserData.fulfilled, (state, action) => {
        state.currentUser = { ...action.payload, isAuthenticated: true };
        state.profileLoading = false;
      });
      builder.addCase(postSlice.actions.likePost, (state, action) => {
        state.currentUser.likes.push({
          displayName: action.payload.displayName,
          postId: action.payload.postId,
        });
      });
      builder.addCase(postSlice.actions.unlikePost, (state, action) => {
        state.currentUser.likes = state.currentUser.likes.filter(
          like => like.postId !== action.payload.postId
        );
      });
    },
  }),
  {
    setCurrentUser,
    signInFailure,
    signInSuccess,
    loadingUi,
    setLoadingUser,
    setAuthenticated,
    setUnAuthenticated,
  } = userSlice.actions,
  selectCurrentUser = (state: RootState) => state.user.currentUser;

export default userSlice.reducer;
