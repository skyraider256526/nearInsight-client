import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "app/store";
import axios, { AxiosError } from "axios";

interface PostState {
  location: {
    latitude: number;
    longitude: number;
  };
  post: {
    postId: string;
    body: string;
    createdAt: any;
    likeCount: number;
    commentCount: number;
    userImage: string;
    displayName: string;
    comments: any;
  };
  posts: any;
  error: any;
  loading: boolean;
  dialogLoading: boolean;
  isPosting: boolean;
}

// THUNK

// Get all posts by location
export const getPosts = createAsyncThunk(
  "posts/get",
  (position: { latitude: number; longitude: number }, thunkApI) => {
    return axios
      .get("/post", {
        params: {
          latitude: position.latitude,
          longitude: position.longitude,
        },
      })
      .then(res => {
        return res.data.posts;
      })
      .catch(err => thunkApI.rejectWithValue(err));
  }
);

export const getPost = createAsyncThunk(
  "post/get",
  (postId: string, thunkApi) => {
    return axios
      .get(`/post/${postId}`)
      .then(res => {
        return res.data;
      })
      .catch(err => {
        return thunkApi.rejectWithValue(err.response.data);
      });
  }
);

export const createPost = createAsyncThunk(
  "posts/post",
  (
    newPost: {
      body: string;
      position: { latitude: number; longitude: number };
    },
    thunkApi
  ) => {
    return axios
      .post("/post", newPost)
      .then(res => {
        console.log(res.data);
        return res.data;
      })
      .catch(err => {
        return thunkApi.rejectWithValue(err.response.data);
      });
  }
);

export const likePost = postId => dispatch => {
  axios
    .get(`/post/${postId}/like`)
    .then(res => dispatch(postSlice.actions.likePost(res.data)))
    .catch(err => {
      console.log(err);
      dispatch(postSlice.actions.setErrors(err));
    });
};

export const unlikePost = postId => dispatch => {
  axios
    .get(`/post/${postId}/unlike`)
    .then(res => dispatch(postSlice.actions.unlikePost(res.data)))
    .catch(err => {
      console.log(err);
      dispatch(postSlice.actions.setErrors(err));
    });
};

export const deletePost = postId => dispatch => {
  axios
    .delete(`/post/${postId}`)
    .then(() => dispatch(postSlice.actions.deletePost(postId)))
    .catch(err => {
      console.log(err);
    });
};

export const submitComment = (postId, commentData) => dispatch => {
  axios
    .post(`/post/${postId}/comment`, commentData)
    .then(res => {
      dispatch(postSlice.actions.submitComment(res.data));
    })
    .catch(err => {
      console.error(err);
    });
};

/// END: THUNK

//TODO:Get the type of current user
const initialState: PostState = {
  location: { latitude: NaN, longitude: NaN },
  error: {
    body: "",
  },
  loading: false,
  posts: [],
  post: {
    postId: "",
    body: "",
    createdAt: {
      _seconds: 0,
    },
    likeCount: 0,
    commentCount: 0,
    userImage: "",
    displayName: "",
    comments: [],
  },
  isPosting: false,
  dialogLoading: false,
};

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
      setLocation: (state, action) => {
        state.location = action.payload;
      },
      clearLocation: state => {
        state = initialState;
      },
      setErrors: (state, action) => {
        state.error = action.payload;
      },
      clearErrors: state => {
        state.error = null;
      },
      likePost: (state, action) => {
        let idx = state.posts.findIndex(
          post => post.postId === action.payload.postId
        );
        state.posts[idx] = action.payload;
        if (state.post.postId === action.payload.postId)
          state.post = action.payload;
      },
      unlikePost: (state, action) => {
        let idx = state.posts.findIndex(
          post => post.postId === action.payload.postId
        );
        state.posts[idx] = action.payload;
        if (state.post.postId === action.payload.postId)
          state.post = action.payload;
      },
      deletePost: (state, action) => {
        state.posts = state.posts.filter(
          post => post.postId !== action.payload
        );
      },
      submitComment: (state, action) => {
        state.post.comments.unshift(action.payload);
      },
    },
    extraReducers: builder => {
      builder.addCase(getPosts.pending, state => {
        state.loading = true;
      });
      builder.addCase(createPost.pending, state => {
        state.isPosting = true;
      });
      builder.addCase(getPost.pending, state => {
        state.dialogLoading = true;
      });
      builder.addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      });
      builder.addCase(createPost.fulfilled, (state, action) => {
        state.isPosting = false;
        state.posts.push(action.payload);
      });
      builder.addCase(getPost.fulfilled, (state, action) => {
        state.dialogLoading = false;
        state.post = action.payload;
      });
      builder.addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.posts = [];
        state.error = action.payload;
      });
      builder.addCase(createPost.rejected, (state, action) => {
        state.isPosting = false;
        state.error = action.payload;
      });
      builder.addCase(getPost.rejected, (state, action) => {
        state.dialogLoading = false;
        state.error = action.payload;
      });
    },
    // extraReducers: {
    //   [getPosts.pending]: state => {
    //     state.loading = true;
    //   },
    // },
  }),
  { setLocation, clearErrors } = postSlice.actions;

export default postSlice.reducer;
