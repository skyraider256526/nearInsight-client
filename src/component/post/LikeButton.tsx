import React from "react";
// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
// Redux
import { RootState } from "app/store";

import MyButton from "component/myButton";
import { likePost, unlikePost } from "features/data/postSlice";

export default function LikeButton({ postId }) {
  const isAuthenticated = useSelector(
      (state: RootState) => state.user.currentUser.isAuthenticated
    ),
    likes = useSelector((state: RootState) => state.user.currentUser.likes),
    credentials = useSelector(
      (state: RootState) => state.user.currentUser.credentials
    ),
    dispatch = useDispatch();
  function likedPost() {
    if (likes && likes.find(like => like.postId === postId)) return true;
    else return false;
  }
  const likeButton = likedPost() ? (
    <MyButton tip="Undo like" onClick={() => dispatch(unlikePost(postId))}>
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Like" onClick={() => dispatch(likePost(postId))}>
      <FavoriteBorder color="primary" />
    </MyButton>
  );

  return likeButton;
}
