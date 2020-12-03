import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";

import { RootState } from "app/store";
import { useSelector, useDispatch } from "react-redux";

// MUI
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";

// Icons
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

// Redux
import { likePost, unlikePost } from "features/data/postSlice";

import MyButton from "component/myButton";
import PostDialog from "./PostDialog";
import DeletePost from "./DeletePost";
import LikeButton from "./LikeButton";

interface Post {
  userImage: string;
  body: string;
  createdAt: any;
  likeCount: number;
  commentCount: number;
  displayName: string;
  postId: string;
  userId: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      position: "relative",
      display: "flex",

      marginBottom: 20,
    },
    image: {
      minWidth: 200,
    },
    content: { padding: 25, objectFit: "cover" },
  })
);

export function Post({
  userImage,
  body,
  createdAt,
  likeCount,
  commentCount,
  displayName,
  postId,
  userId,
}: Post): JSX.Element {
  dayjs.extend(relativeTime);
  console.log(createdAt);
  const classes = useStyles(),
    credentials = useSelector(
      (state: RootState) => state.user.currentUser.credentials
    ),
    deleteButton =
      userId === credentials.userId ? <DeletePost postId={postId} /> : null;
  console.log();

  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title="Profile image"
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${userId}`}
          color="primary"
        >
          {displayName}
        </Typography>
        {deleteButton}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt._seconds * 1000).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        <LikeButton postId={postId} />
        <span>{likeCount} Likes</span>
        <MyButton tip="comments" onClick={() => console.log("comment")}>
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} comments</span>
        <PostDialog
          postId={postId}
          displayName={displayName}
          // openDialog={openDialog}
        />
      </CardContent>
    </Card>
  );
}
